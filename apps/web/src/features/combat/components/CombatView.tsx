import { useMemo, useState } from "react";
import { CLASSES_BY_ID, type SkillId } from "@app/content";
import { selectAvailableActions, selectCombatView, type EngineAction } from "@app/engine";
import type { RunView } from "@app/shared";
import { Layout } from "../../../components/Layout";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { CombatActionBar } from "./CombatActionBar";
import { Battlefield } from "./Battlefield";
import { CombatantPanel } from "./CombatantPanel";
import { CombatStatsBar } from "./CombatStatsBar";
import { getEnemyDefinition } from "../utils/combatDisplay";
import { formatTitle } from "../../../game/effectDisplay";

type CombatViewProps = {
	run: RunView;
};

export function CombatView({ run }: CombatViewProps) {
	const [combatViewTab, setCombatViewTab] = useState<"log" | "portrait">("log");
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);

	const { hero } = run.state;
	const combatView = selectCombatView(run.state);
	const enemySourceId = combatView?.combat.enemy.sourceId ?? null;

	const enemyDefinition = useMemo(
		() => (enemySourceId ? getEnemyDefinition(enemySourceId) : null),
		[enemySourceId],
	);

	if (!combatView) {
		return <p>Combat state is unavailable.</p>;
	}

	const { battleNumber, combat, goldMultiplier, zone } = combatView;
	const heroClass = CLASSES_BY_ID[hero.classId];
	const zoneLabel = formatTitle(zone);
	const availableActions = selectAvailableActions(run.state);
	const availableActionTypes = new Set(availableActions.map((action) => action.type));
	const availableSkillIds = new Set(
		availableActions.flatMap((action) =>
			action.type === "PLAYER_USE_SKILL" ? [action.skillId] : [],
		),
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

	function handleUseSkill(skillId: SkillId) {
		submitAction(
			{
				type: "PLAYER_USE_SKILL",
				skillId,
			},
			"Unable to use that skill. Please try again.",
		);
	}

	return (
		<Layout>
			<div className="flex flex-1 bg-bg-base text-base text-text">
				<div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-4 py-3 md:px-6 md:py-4">
					<CombatStatsBar
						battleNumber={battleNumber}
						goldMultiplier={goldMultiplier}
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
						availableSkillIds={availableSkillIds}
						canContinue={availableActionTypes.has("CONTINUE_TO_NEXT_COMBAT")}
						canReturnToTown={availableActionTypes.has("RETURN_TO_TOWN")}
						onBasicAttack={handleBasicAttack}
						onUseSkill={handleUseSkill}
						onContinue={handleContinue}
						onReturnToTown={handleReturnToTown}
					/>
				</div>
			</div>
		</Layout>
	);
}
