import { useState } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { WorldLogEntry } from "@app/shared";

const transport = vi.hoisted(() => ({
	listeners: new Map<string, Set<(...args: never[]) => void>>(),
	get: vi.fn(),
}));

vi.mock("../../../lib/socket", () => {
	const socket = {
		on(name: string, callback: (...args: never[]) => void) {
			const callbacks = transport.listeners.get(name) ?? new Set();

			callbacks.add(callback);
			transport.listeners.set(name, callbacks);

			return socket;
		},
		off(name: string, callback: (...args: never[]) => void) {
			transport.listeners.get(name)?.delete(callback);
			return socket;
		},
	};

	return { socket };
});
vi.mock("../../../lib/api", () => ({ api: { get: transport.get } }));

import { useWorldLog } from "./useWorldLog";
import { WorldLogPanel } from "../index";

function entry(id: string): WorldLogEntry {
	return {
		id,
		createdAt: "2026-01-01T00:00:00.000Z",
		heroName: id,
		classId: "warrior",
		mode: "dailyChallenge",
		displayName: "Edgar",
		event: { type: "hero_retired" },
	};
}

function Entries() {
	const log = useWorldLog();

	return <output data-testid="entries">{log.entries.map((entry) => entry.id).join(",")}</output>;
}

function PanelProbe() {
	const [visible, setVisible] = useState(false);
	const log = useWorldLog();
	return (
		<>
			<button onClick={() => setVisible(!visible)}>World Log</button>
			{visible && <WorldLogPanel {...log} />}
		</>
	);
}

function setup(showSidebar = false) {
	const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

	return render(
		<QueryClientProvider client={client}>
			{showSidebar ? <PanelProbe /> : <Entries />}
		</QueryClientProvider>,
	);
}

describe("world log connection and panel", () => {
	beforeEach(() => {
		transport.listeners.clear();
		transport.get.mockReset();
	});

	it("keeps live arrivals during the initial fetch, recovers on reconnect and removes listeners", async () => {
		let resolve!: (data: { entries: WorldLogEntry[] }) => void;
		transport.get.mockReturnValueOnce({
			json: () =>
				new Promise((done) => {
					resolve = done;
				}),
		});
		const view = setup();
		act(() => {
			transport.listeners
				.get("world-log:entry")!
				.forEach((callback) => callback(entry("b") as never));
		});
		await act(async () => {
			resolve({ entries: [entry("a")] });
		});
		await waitFor(() => expect(screen.getByTestId("entries")).toHaveTextContent("a,b"));
		transport.get.mockReturnValue({
			json: async () => ({ entries: [entry("b"), entry("c")] }),
		});
		act(() => {
			transport.listeners.get("connect")!.forEach((callback) => callback());
		});
		await waitFor(() => expect(screen.getByTestId("entries")).toHaveTextContent("a,b,c"));
		view.unmount();
		expect([...transport.listeners.values()].every((callbacks) => callbacks.size === 0)).toBe(
			true,
		);
	});

	it("keeps receiving activity while the log tab is hidden", async () => {
		transport.get.mockReturnValue({ json: async () => ({ entries: [entry("Aldric")] }) });
		setup(true);
		await waitFor(() => expect(transport.listeners.get("world-log:entry")?.size).toBe(1));
		act(() => {
			transport.listeners
				.get("world-log:entry")!
				.forEach((callback) => callback(entry("Mira") as never));
		});
		act(() => screen.getByRole("button", { name: "World Log" }).click());
		const heroName = await screen.findByText("Aldric the Warrior", { selector: "span" });
		expect(heroName.parentElement).toHaveTextContent("Aldric the Warrior retired victorious");
		expect(heroName.parentElement?.previousElementSibling).toHaveTextContent("[Edgar]");
		expect(
			await screen.findByText("Mira the Warrior", { selector: "span" }),
		).toBeInTheDocument();
		act(() => screen.getByRole("button", { name: "World Log" }).click());
		expect(transport.listeners.get("world-log:entry")?.size).toBe(1);
	});
});
