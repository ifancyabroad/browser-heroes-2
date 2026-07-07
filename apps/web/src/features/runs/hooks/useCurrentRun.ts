import { useQuery } from "@tanstack/react-query";
import { getCurrentRun } from "../api/getCurrentRun";
import { runKeys } from "../api/runKeys";

type UseCurrentRunOptions = {
	enabled?: boolean;
};

export function useCurrentRun(options?: UseCurrentRunOptions) {
	return useQuery({
		queryKey: runKeys.current(),
		queryFn: ({ signal }) => getCurrentRun(signal),
		enabled: options?.enabled ?? true,
	});
}
