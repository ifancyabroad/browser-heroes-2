import type { PropsWithChildren } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { PageLoader } from "../../../components/PageLoader";

export function SessionGate({ children }: PropsWithChildren) {
	const { isPending, isError } = useCurrentUser();

	if (isPending) {
		return <PageLoader />;
	}

	if (isError) {
		return <div>Unable to load session.</div>;
	}

	return children;
}
