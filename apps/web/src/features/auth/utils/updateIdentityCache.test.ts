import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { dailyChallengeKeys } from "../../dailyChallenges/api/dailyChallengeKeys";
import { runKeys } from "../../runs/api/runKeys";
import { historyKeys } from "../../history/api/historyKeys";
import { authKeys } from "../api/authKeys";
import { updateIdentityCache } from "./updateIdentityCache";

describe("updateIdentityCache", () => {
	it("resets user-owned data without clearing unrelated cached data", () => {
		const queryClient = new QueryClient();
		const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");

		queryClient.setQueryData(runKeys.current(), { run: {} });
		const historyQuery = {
			page: 1,
			limit: 20,
			sort: "completedAt",
			direction: "desc",
		} as const;
		queryClient.setQueryData(historyKeys.runs(historyQuery), { entries: [] });
		queryClient.setQueryData(["content"], { classes: [] });

		updateIdentityCache(queryClient, { user: null });

		expect(queryClient.getQueryData(authKeys.currentUser())).toEqual({ user: null });
		expect(queryClient.getQueryData(runKeys.current())).toBeUndefined();
		expect(queryClient.getQueryData(historyKeys.runs(historyQuery))).toBeUndefined();
		expect(queryClient.getQueryData(["content"])).toEqual({ classes: [] });
		expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: dailyChallengeKeys.all });
	});
});
