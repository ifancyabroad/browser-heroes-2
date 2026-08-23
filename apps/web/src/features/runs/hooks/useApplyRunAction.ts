import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CurrentRunResponse, GetRunResponse, RunActionPayload } from "@app/shared";
import { applyRunAction } from "../api/applyRunAction";
import { runKeys } from "../api/runKeys";
import { isPlayableRunState } from "../utils/isPlayableRunState";
import { achievementKeys } from "../../achievements/api/achievementKeys";
import { useAchievementToastStore } from "../../achievements/stores/achievementToastStore";
import { dailyChallengeKeys } from "../../dailyChallenges/api/dailyChallengeKeys";

export function useApplyRunAction() {
	const queryClient = useQueryClient();
	const showAchievementUnlocks = useAchievementToastStore(
		(state) => state.showAchievementUnlocks,
	);

	return useMutation({
		mutationFn: (payload: RunActionPayload) => applyRunAction(payload),

		onSuccess: ({ run, unlockedAchievements }) => {
			queryClient.setQueryData<CurrentRunResponse>(runKeys.game(), { run });

			queryClient.setQueryData<GetRunResponse>(runKeys.detail(run.id), { run });

			queryClient.setQueryData<CurrentRunResponse>(
				runKeys.current(),
				isPlayableRunState(run.state) ? { run } : { run: null },
			);

			if (run.mode === "dailyChallenge" && !isPlayableRunState(run.state)) {
				void queryClient.invalidateQueries({ queryKey: dailyChallengeKeys.all });
			}

			if (unlockedAchievements?.length > 0) {
				showAchievementUnlocks(unlockedAchievements);
				void queryClient.invalidateQueries({ queryKey: achievementKeys.all });
			}
		},
	});
}
