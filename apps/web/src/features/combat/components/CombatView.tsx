import { useMemo, useState } from "react";
import { CLASSES_BY_ID } from "@app/content";
import { getZoneForRun, selectAvailableActions, type EngineAction } from "@app/engine";
import type { RunView } from "@app/shared";
import { Layout } from "../../../components/Layout";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { CombatActionBar } from "./CombatActionBar";
import { Battlefield } from "./Battlefield";
import { CombatantPanel } from "./CombatantPanel";
import { CombatStatsBar } from "./CombatStatsBar";
import { formatTitle, getEnemyDefinition } from "../utils/combatDisplay";

type CombatViewProps = {
	run: RunView;
};

export function CombatView({ run }: CombatViewProps) {
	const [combatViewTab, setCombatViewTab] = useState<"log" | "portrait">("log");
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);

	const { combat, hero } = run.state;

	const enemyDefinition = useMemo(
		() => (combat ? getEnemyDefinition(combat.enemy.sourceId) : null),
		[combat],
	);

	if (!combat) {
		return <p>Combat state is unavailable.</p>;
	}

	const heroClass = CLASSES_BY_ID[hero.classId];
	const zoneLabel = formatTitle(getZoneForRun(run.state.zoneNumber));
	const availableActionTypes = new Set(
		selectAvailableActions(run.state).map((action) => action.type),
	);

	function submitAction(action: EngineAction, fallbackErrorMessage: string) {
		applyRunAction.mutate(
			{
				runId: run.id,
				action,
			},
			{
				onSuccess: ({ result }) => {
					if (!result.ok) {
						showError(getEngineErrorMessage(result.error));
					}
				},
				onError: () => {
					showError(fallbackErrorMessage);
				},
			},
		);
	}

	function handleBasicAttack() {
		submitAction(
			{
				type: "PLAYER_BASIC_ATTACK",
			},
			"Unable to perform the attack. Please try again.",
		);
	}

	function handleContinue() {
		submitAction(
			{
				type: "CONTINUE_TO_NEXT_COMBAT",
			},
			"Unable to continue to the next combat. Please try again.",
		);
	}

	function handleReturnToTown() {
		submitAction(
			{
				type: "RETURN_TO_TOWN",
			},
			"Unable to return to town. Please try again.",
		);
	}

	return (
		<Layout>
			<div className="flex flex-1 bg-bg-base text-base text-text">
				<div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-4 py-3 md:px-6 md:py-4">
					<CombatStatsBar
						battleNumber={run.state.battleNumber}
						goldMultiplier={run.state.streak + 1}
						turnNumber={combat.turnNumber}
						zoneLabel={zoneLabel}
					/>

					<section
						className="grid gap-3 md:grid-cols-2 md:gap-10"
						aria-label="Combatants"
					>
						<CombatantPanel
							combatant={combat.player}
							identity={`${heroClass.name} ${combat.player.name}`}
							ariaLabel="Hero"
						/>
						<CombatantPanel
							combatant={combat.enemy}
							identity={combat.enemy.name}
							ariaLabel="Enemy"
						/>
					</section>

					<Battlefield
						activeTab={combatViewTab}
						onTabChange={setCombatViewTab}
						heroPortrait={heroClass.portrait}
						heroName={combat.player.name}
						enemyPortrait={enemyDefinition?.portrait ?? null}
						enemyName={combat.enemy.name}
						logEntries={combat.log}
					/>

					<CombatActionBar
						player={combat.player}
						isPending={applyRunAction.isPending}
						canBasicAttack={availableActionTypes.has("PLAYER_BASIC_ATTACK")}
						canContinue={availableActionTypes.has("CONTINUE_TO_NEXT_COMBAT")}
						canReturnToTown={availableActionTypes.has("RETURN_TO_TOWN")}
						onBasicAttack={handleBasicAttack}
						onContinue={handleContinue}
						onReturnToTown={handleReturnToTown}
					/>
				</div>
			</div>
		</Layout>
	);
}
