import type { PropsWithChildren } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

export function SessionGate({ children }: PropsWithChildren) {
	const { isPending, isError } = useCurrentUser();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Unable to load session.</div>;
	}

	return children;
}
