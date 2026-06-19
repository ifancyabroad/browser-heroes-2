import { Navigate } from "react-router-dom";
import { useCurrentRun } from "../features/runs";
import { TownView } from "../features/town";
import { PageLoader } from "../components/PageLoader";

export default function Game() {
	const { data, isPending } = useCurrentRun();

	if (isPending) {
		return <PageLoader />;
	}

	if (!data?.run) {
		return <Navigate to="/create-character" replace />;
	}

	const { run } = data;

	switch (run.state.phase) {
		case "town":
			return <TownView run={run} />;

		case "combat":
			return <p>Combat phase</p>;

		case "dead":
			return <p>Run over</p>;

		case "complete":
			return <p>Run complete</p>;
	}
}
