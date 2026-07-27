import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { leaderboardKeys } from "../../leaderboards/api/leaderboardKeys";
import { runKeys } from "../../runs/api/runKeys";
import { statsKeys } from "../../stats/api/statsKeys";
import { authKeys } from "../api/authKeys";
import { updateIdentityCache } from "./updateIdentityCache";

describe("updateIdentityCache", () => {
	it("resets user-owned data without clearing unrelated cached data", () => {
		const queryClient = new QueryClient();
		const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");

		queryClient.setQueryData(runKeys.current(), { run: {} });
		queryClient.setQueryData(statsKeys.summary(), { summary: {} });
		queryClient.setQueryData(["content"], { classes: [] });

		updateIdentityCache(queryClient, { user: null });

		expect(queryClient.getQueryData(authKeys.currentUser())).toEqual({ user: null });
		expect(queryClient.getQueryData(runKeys.current())).toBeUndefined();
		expect(queryClient.getQueryData(statsKeys.summary())).toBeUndefined();
		expect(queryClient.getQueryData(["content"])).toEqual({ classes: [] });
		expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: leaderboardKeys.all });
	});
});
