import type { CurrentRunResponse, GetRunResponse } from "@app/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { runKeys } from "../../runs/api/runKeys";
import { dailyChallengeKeys } from "../api/dailyChallengeKeys";
import { startDailyChallenge } from "../api/startDailyChallenge";

export function useStartDailyChallenge() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: startDailyChallenge,
		onSuccess: ({ run }) => {
			const response = { run };
			queryClient.setQueryData<CurrentRunResponse>(runKeys.current(), response);
			queryClient.setQueryData<CurrentRunResponse>(runKeys.game(), response);
			queryClient.setQueryData<GetRunResponse>(runKeys.detail(run.id), response);
			void queryClient.invalidateQueries({
				queryKey: dailyChallengeKeys.all,
				refetchType: "none",
			});
		},
	});
}
