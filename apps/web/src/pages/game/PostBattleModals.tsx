import { useEffect, useState } from "react";
import type { RunView } from "@app/shared";
import { LevelUpModalController } from "../../features/levelUp";
import { RewardModalController } from "../../features/rewards";
import { FinalBossVictoryModalController } from "../../features/runSummary";

const POST_BATTLE_MODAL_DELAY_MS = 1_000;

type PostBattleModalsProps = {
	run: RunView;
};

export function PostBattleModals({ run }: PostBattleModalsProps) {
	const victoryKey = getVictoryKey(run);
	const [readyVictoryKey, setReadyVictoryKey] = useState(victoryKey);

	useEffect(() => {
		if (victoryKey === null || readyVictoryKey === victoryKey) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setReadyVictoryKey(victoryKey);
		}, POST_BATTLE_MODAL_DELAY_MS);

		return () => window.clearTimeout(timeoutId);
	}, [readyVictoryKey, victoryKey]);

	if (victoryKey !== null && readyVictoryKey !== victoryKey) {
		return null;
	}

	return (
		<>
			<LevelUpModalController run={run} />
			<RewardModalController run={run} />
			<FinalBossVictoryModalController run={run} />
		</>
	);
}

function getVictoryKey(run: RunView): string | null {
	const { state } = run;

	if (state.phase !== "combat" || state.combat?.status !== "player_won") {
		return null;
	}

	return `${state.battleNumber}:${state.combat.enemy.id}`;
}
