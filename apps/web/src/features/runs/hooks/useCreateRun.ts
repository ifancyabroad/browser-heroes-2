import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CurrentRunResponse, GetRunResponse } from "@app/shared";
import { createRun } from "../api/createRun";
import { runKeys } from "../api/runKeys";
import { bestiaryKeys } from "../../bestiary/api/bestiaryKeys";

export function useCreateRun() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createRun,
		onSuccess: (data) => {
			const { run } = data;

			queryClient.setQueryData<CurrentRunResponse>(runKeys.current(), data);

			queryClient.setQueryData<CurrentRunResponse>(runKeys.game(), data);

			queryClient.setQueryData<GetRunResponse>(runKeys.detail(run.id), data);

			void queryClient.invalidateQueries({
				queryKey: bestiaryKeys.all,
				refetchType: "none",
			});
		},
	});
}
