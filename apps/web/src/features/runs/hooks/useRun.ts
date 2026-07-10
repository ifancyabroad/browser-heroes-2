import { useQuery } from "@tanstack/react-query";
import { getRun } from "../api/getRun";
import { runKeys } from "../api/runKeys";

type UseRunOptions = {
	enabled?: boolean;
};

export function useRun(runId: string, options?: UseRunOptions) {
	return useQuery({
		queryKey: runKeys.detail(runId),
		queryFn: ({ signal }) => getRun(runId, signal),
		enabled: options?.enabled ?? true,
	});
}
