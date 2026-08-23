import type { AuthUserResponse } from "@app/shared";
import type { QueryClient } from "@tanstack/react-query";
import { dailyChallengeKeys } from "../../dailyChallenges/api/dailyChallengeKeys";
import { runKeys } from "../../runs/api/runKeys";
import { historyKeys } from "../../history/api/historyKeys";
import { authKeys } from "../api/authKeys";
import { achievementKeys } from "../../achievements/api/achievementKeys";

export function updateIdentityCache(queryClient: QueryClient, data: AuthUserResponse) {
	queryClient.setQueryData(authKeys.currentUser(), data);
	queryClient.removeQueries({ queryKey: runKeys.all });
	queryClient.removeQueries({ queryKey: historyKeys.all });
	queryClient.removeQueries({ queryKey: achievementKeys.all });
	void queryClient.invalidateQueries({ queryKey: dailyChallengeKeys.all });
}
