import { Navigate } from "react-router-dom";
import { useGameRun } from "../features/runs";
import { TownView } from "../features/town";
import { PageLoader } from "../components/PageLoader";
import { CombatView } from "../features/combat";
import { LevelUpModalController } from "../features/levelUp";
import { RewardModalController } from "../features/rewards";
import {
	DeathScreen,
	FinalBossVictoryModalController,
	VictoryScreen,
} from "../features/runSummary";
import { GamePhaseTransition } from "./GamePhaseTransition";
import { HowToPlayModal } from "../features/howToPlay";

export default function Game() {
	const { data, isPending } = useGameRun();

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
			view = <DeathScreen run={run} />;
			break;

		case "retired":
			view = <VictoryScreen run={run} />;
			break;
	}

	return (
		<>
			<GamePhaseTransition run={run}>{view}</GamePhaseTransition>
			<LevelUpModalController run={run} />
			<RewardModalController run={run} />
			<FinalBossVictoryModalController run={run} />
			<HowToPlayModal />
		</>
	);
}
