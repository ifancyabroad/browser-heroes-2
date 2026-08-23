import type { RunView } from "@app/shared";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { dailyChallengeKeys } from "../api/dailyChallengeKeys";

const startDailyChallenge = vi.hoisted(() => vi.fn());

vi.mock("../api/startDailyChallenge", () => ({ startDailyChallenge }));

import { useStartDailyChallenge } from "./useStartDailyChallenge";

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

describe("useStartDailyChallenge", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("marks Daily Challenge data stale without immediately refetching it", async () => {
		const run = {
			id: "run-id",
			mode: "dailyChallenge",
			dailyChallengeDate: "2026-08-23",
			state: {},
			summary: {},
		} as RunView;
		startDailyChallenge.mockResolvedValue({ run });
		const { queryClient, wrapper } = createHarness();
		const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");
		const { result } = renderHook(() => useStartDailyChallenge(), { wrapper });

		await act(() => result.current.mutateAsync({ heroName: "Ada" }));

		expect(invalidateQueries).toHaveBeenCalledWith({
			queryKey: dailyChallengeKeys.all,
			refetchType: "none",
		});
	});
});
