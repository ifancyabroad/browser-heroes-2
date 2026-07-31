import type { AuthUserResponse } from "@app/shared";
import type { QueryClient } from "@tanstack/react-query";
import { leaderboardKeys } from "../../leaderboards/api/leaderboardKeys";
import { runKeys } from "../../runs/api/runKeys";
import { statsKeys } from "../../stats/api/statsKeys";
import { authKeys } from "../api/authKeys";
import { achievementKeys } from "../../achievements/api/achievementKeys";

export function updateIdentityCache(queryClient: QueryClient, data: AuthUserResponse) {
	queryClient.setQueryData(authKeys.currentUser(), data);
	queryClient.removeQueries({ queryKey: runKeys.all });
	queryClient.removeQueries({ queryKey: statsKeys.all });
	queryClient.removeQueries({ queryKey: achievementKeys.all });
	void queryClient.invalidateQueries({ queryKey: leaderboardKeys.all });
}
