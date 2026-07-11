import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CurrentRunResponse, GetRunResponse, RunActionPayload } from "@app/shared";
import { applyRunAction } from "../api/applyRunAction";
import { runKeys } from "../api/runKeys";
import { isPlayableRunState } from "../utils/isPlayableRunState";

export function useApplyRunAction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: RunActionPayload) => applyRunAction(payload),

		onSuccess: ({ run }) => {
			queryClient.setQueryData<CurrentRunResponse>(runKeys.game(), { run });

			queryClient.setQueryData<GetRunResponse>(runKeys.detail(run.id), { run });

			queryClient.setQueryData<CurrentRunResponse>(
				runKeys.current(),
				isPlayableRunState(run.state) ? { run } : { run: null },
			);
		},
	});
}
