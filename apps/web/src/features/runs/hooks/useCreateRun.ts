import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRun } from "../api/createRun";
import { runKeys } from "../api/runKeys";
import type { CurrentRunResponse, GetRunResponse } from "@app/shared";

export function useCreateRun() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createRun,
		onSuccess: (data) => {
			const { run } = data;

			queryClient.setQueryData<CurrentRunResponse>(runKeys.current(), data);

			queryClient.setQueryData<CurrentRunResponse>(runKeys.game(), data);

			queryClient.setQueryData<GetRunResponse>(runKeys.detail(run.id), data);
		},
	});
}
