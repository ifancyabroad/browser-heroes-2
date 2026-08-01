import "@tanstack/react-query";

type ErrorPresentationMeta = Record<string, unknown> & {
	errorMessage?: string;
};

declare module "@tanstack/react-query" {
	interface Register {
		queryMeta: ErrorPresentationMeta;
		mutationMeta: ErrorPresentationMeta;
	}
}
