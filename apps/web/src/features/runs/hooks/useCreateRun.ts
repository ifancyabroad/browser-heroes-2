import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRun } from "../api/createRun";
import { runKeys } from "../api/runKeys";

export function useCreateRun() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createRun,
		onSuccess: (data) => {
			queryClient.setQueryData(runKeys.current(), data.run);
		},
	});
}
