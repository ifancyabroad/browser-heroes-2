import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { useErrorModalStore } from "../stores/errorModalStore";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (_error, query) => showConfiguredError(query.meta),
	}),
	mutationCache: new MutationCache({
		onError: (_error, _variables, _onMutateResult, mutation) =>
			showConfiguredError(mutation.meta),
	}),
	defaultOptions: {
		queries: {
			retry: 1,
			staleTime: 30_000, // cached for 30s
			gcTime: 5 * 60_000, // garbage-collect after 5m
			refetchOnWindowFocus: false,
		},
	},
});

function showConfiguredError(meta: Record<string, unknown> | undefined): void {
	if (typeof meta?.errorMessage === "string") {
		useErrorModalStore.getState().showError(meta.errorMessage);
	}
}
