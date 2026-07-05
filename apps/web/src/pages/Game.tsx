import { Navigate } from "react-router-dom";
import { useCurrentRun } from "../features/runs";
import { TownView } from "../features/town";
import { PageLoader } from "../components/PageLoader";
import { CombatView } from "../features/combat";
import { LevelUpModalController } from "../features/levelUp";
import { RewardModalController } from "../features/rewards";

export default function Game() {
	const { data, isPending } = useCurrentRun();

	if (isPending) {
		return <PageLoader />;
	}

	if (!data?.run) {
		return <Navigate to="/create-character" replace />;
	}

	const { run } = data;
	let view;

	switch (run.state.phase) {
		case "town":
			view = <TownView run={run} />;
			break;

		case "combat":
			view = <CombatView run={run} />;
			break;

		case "dead":
			view = <p>Run over</p>;
			break;

		case "complete":
			view = <p>Run complete</p>;
			break;
	}

	return (
		<>
			{view}
			<LevelUpModalController run={run} />
			<RewardModalController run={run} />
		</>
	);
}
