import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import type { RunView } from "@app/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { runKeys } from "../api/runKeys";

const applyRunAction = vi.hoisted(() => vi.fn());

vi.mock("../api/applyRunAction", () => ({ applyRunAction }));

import { useApplyRunAction } from "./useApplyRunAction";

function createRun(phase: RunView["state"]["phase"]): RunView {
	return {
		id: "run-id",
		status: phase === "town" || phase === "combat" ? "active" : phase,
		state: { phase } as RunView["state"],
		summary: {} as RunView["summary"],
		createdAt: "2026-01-01T00:00:00.000Z",
		updatedAt: "2026-01-01T00:00:00.000Z",
		completedAt: null,
	};
}

function createHarness() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});
	const wrapper = ({ children }: PropsWithChildren) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
	return { queryClient, wrapper };
}

describe("useApplyRunAction", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("submits the action payload unchanged", async () => {
		const run = createRun("combat");
		const payload = {
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" as const },
		};
		applyRunAction.mockResolvedValue({
			run,
			result: { ok: true, state: run.state, events: [] },
		});
		const { wrapper } = createHarness();
		const { result } = renderHook(() => useApplyRunAction(), { wrapper });

		await act(() => result.current.mutateAsync(payload));

		expect(applyRunAction).toHaveBeenCalledWith(payload);
	});

	it("updates all active-run caches after success", async () => {
		const run = createRun("town");
		applyRunAction.mockResolvedValue({
			run,
			result: { ok: true, state: run.state, events: [] },
		});
		const { queryClient, wrapper } = createHarness();
		const { result } = renderHook(() => useApplyRunAction(), { wrapper });

		await act(() =>
			result.current.mutateAsync({
				runId: "run-id",
				action: { type: "RETURN_TO_TOWN" },
			}),
		);

		expect(queryClient.getQueryData(runKeys.game())).toEqual({ run });
		expect(queryClient.getQueryData(runKeys.detail("run-id"))).toEqual({ run });
		expect(queryClient.getQueryData(runKeys.current())).toEqual({ run });
	});

	it.each(["dead", "retired"] as const)(
		"removes %s runs from the playable current-run cache",
		async (phase) => {
			const run = createRun(phase);
			applyRunAction.mockResolvedValue({
				run,
				result: { ok: true, state: run.state, events: [] },
			});
			const { queryClient, wrapper } = createHarness();
			const { result } = renderHook(() => useApplyRunAction(), { wrapper });

			await act(() =>
				result.current.mutateAsync({
					runId: "run-id",
					action: { type: "PLAYER_SKIP_TURN" },
				}),
			);

			expect(queryClient.getQueryData(runKeys.game())).toEqual({ run });
			expect(queryClient.getQueryData(runKeys.current())).toEqual({ run: null });
		},
	);

	it("leaves existing caches unchanged after a failed request", async () => {
		const existingRun = createRun("combat");
		applyRunAction.mockRejectedValue(new Error("Request failed"));
		const { queryClient, wrapper } = createHarness();
		queryClient.setQueryData(runKeys.game(), { run: existingRun });
		const { result } = renderHook(() => useApplyRunAction(), { wrapper });

		act(() => {
			result.current.mutate({
				runId: "run-id",
				action: { type: "PLAYER_SKIP_TURN" },
			});
		});
		await waitFor(() => expect(result.current.isError).toBe(true));

		expect(queryClient.getQueryData(runKeys.game())).toEqual({ run: existingRun });
		expect(queryClient.getQueryData(runKeys.detail("run-id"))).toBeUndefined();
	});
});
