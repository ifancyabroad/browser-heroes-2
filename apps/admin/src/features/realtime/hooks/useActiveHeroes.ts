import { useQuery } from "@tanstack/react-query";
import type { RunMode } from "@app/shared";
import { getActiveHeroes } from "../api/getActiveHeroes";
import { realtimeKeys } from "../api/realtimeKeys";

export function useActiveHeroes(mode: RunMode | "all") {
	return useQuery({
		queryKey: realtimeKeys.activeHeroes(mode),
		queryFn: ({ signal }) => getActiveHeroes(mode, signal),
		refetchInterval: 15_000,
		refetchIntervalInBackground: false,
		refetchOnWindowFocus: "always",
		staleTime: 0,
		gcTime: 0,
	});
}
