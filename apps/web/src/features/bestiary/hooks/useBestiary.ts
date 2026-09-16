import { useQuery } from "@tanstack/react-query";
import { bestiaryKeys } from "../api/bestiaryKeys";
import { getBestiary } from "../api/getBestiary";

export function useBestiary(enabled: boolean) {
	return useQuery({
		queryKey: bestiaryKeys.entries(),
		queryFn: ({ signal }) => getBestiary(signal),
		enabled,
	});
}
