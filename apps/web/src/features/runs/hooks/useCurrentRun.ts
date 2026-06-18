import { useQuery } from "@tanstack/react-query";
import { getCurrentRun } from "../api/getCurrentRun";
import { runKeys } from "../api/runKeys";

export function useCurrentRun() {
	return useQuery({
		queryKey: runKeys.current(),
		queryFn: ({ signal }) => getCurrentRun(signal),
	});
}
