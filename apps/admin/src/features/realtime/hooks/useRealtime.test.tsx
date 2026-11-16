import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { ADMIN_ACTIVITY_EVENT, type AdminActivityEntry } from "@app/shared";

const mocks = vi.hoisted(() => ({
	get: vi.fn(),
	connect: vi.fn(),
	disconnect: vi.fn(),
	removeAllListeners: vi.fn(),
	listeners: new Map<string, (...args: unknown[]) => void>(),
}));
vi.mock("../../../lib/api", () => ({ api: { get: mocks.get } }));
vi.mock("socket.io-client", () => ({
	io: () => {
		const socket = {
			on: (event: string, callback: (...args: unknown[]) => void) => {
				mocks.listeners.set(event, callback);
				return socket;
			},
			connect: mocks.connect,
			disconnect: mocks.disconnect,
			removeAllListeners: mocks.removeAllListeners,
		};
		return socket;
	},
}));
import { useRealtime } from "./useRealtime";

const entry: AdminActivityEntry = {
	id: "live",
	createdAt: "2026-11-16T12:00:00Z",
	runId: "run",
	heroName: "Mira",
	classId: "mage",
	mode: "normal",
	displayName: null,
	event: { type: "hero_created" },
};

describe("useRealtime", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.listeners.clear();
	});
	it("preserves events arriving during history fetch, recovers on reconnect and cleans up", async () => {
		let resolveHistory!: (response: { entries: AdminActivityEntry[] }) => void;
		const history = new Promise<{ entries: AdminActivityEntry[] }>((resolve) => {
			resolveHistory = resolve;
		});
		mocks.get.mockImplementation((path: string) => ({
			json: () => (path.endsWith("heroes") ? Promise.resolve({ heroes: [] }) : history),
		}));
		const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		);
		const { result, unmount } = renderHook(() => useRealtime("all"), { wrapper });
		expect(mocks.listeners.has(ADMIN_ACTIVITY_EVENT)).toBe(true);
		act(() => mocks.listeners.get(ADMIN_ACTIVITY_EVENT)!(entry));
		await act(async () =>
			resolveHistory({
				entries: [{ ...entry, id: "earlier", createdAt: "2026-11-16T11:59:00Z" }, entry],
			}),
		);
		await waitFor(() =>
			expect(result.current.entries.map((value) => value.id)).toEqual(["earlier", "live"]),
		);
		mocks.get.mockImplementation((path: string) => ({
			json: async () =>
				path.endsWith("heroes")
					? { heroes: [] }
					: { entries: [{ ...entry, id: "missed", createdAt: "2026-11-16T12:01:00Z" }] },
		}));
		act(() => mocks.listeners.get("connect")!());
		await waitFor(() =>
			expect(result.current.entries.map((value) => value.id)).toEqual([
				"earlier",
				"live",
				"missed",
			]),
		);
		expect(result.current.status).toBe("Connected");
		unmount();
		expect(mocks.disconnect).toHaveBeenCalled();
		expect(mocks.removeAllListeners).toHaveBeenCalled();
		await waitFor(() => expect(client.getQueriesData({ queryKey: ["realtime"] })).toEqual([]));
	});
	it("clears private activity and refreshes identity after server revocation", async () => {
		mocks.get.mockImplementation((path: string) => ({
			json: async () => (path.endsWith("heroes") ? { heroes: [] } : { entries: [entry] }),
		}));
		const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		const invalidate = vi.spyOn(client, "invalidateQueries");
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		);
		const { result, unmount } = renderHook(() => useRealtime("normal"), { wrapper });
		await waitFor(() => expect(result.current.entries).toHaveLength(1));
		act(() => mocks.listeners.get("disconnect")!("io server disconnect"));
		expect(result.current.entries).toEqual([]);
		expect(invalidate).toHaveBeenCalledWith({ queryKey: ["auth", "current-user"] });
		unmount();
	});

	it("reports a history request failure and recovers without replacing the socket", async () => {
		mocks.get.mockImplementation((path: string) => ({
			json: () =>
				path.endsWith("heroes")
					? Promise.resolve({ heroes: [] })
					: Promise.reject(new Error("Unavailable")),
		}));
		const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		);
		const { result, unmount } = renderHook(() => useRealtime("all"), { wrapper });
		await waitFor(() => expect(result.current.error).toBe(true));
		mocks.get.mockImplementation((path: string) => ({
			json: async () => (path.endsWith("heroes") ? { heroes: [] } : { entries: [entry] }),
		}));
		act(() => result.current.retry());
		await waitFor(() => expect(result.current.entries).toEqual([entry]));
		expect(result.current.error).toBe(false);
		expect(mocks.disconnect).not.toHaveBeenCalled();
		unmount();
	});
});
