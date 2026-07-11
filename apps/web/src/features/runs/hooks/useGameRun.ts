import { useQuery } from "@tanstack/react-query";
import { getCurrentRun } from "../api/getCurrentRun";
import { runKeys } from "../api/runKeys";

export function useGameRun() {
	return useQuery({
		queryKey: runKeys.game(),
		queryFn: ({ signal }) => getCurrentRun(signal),
	});
}
