import { useState } from "react";
import { CLASSES_BY_ID, type SkillId } from "@app/content";
import {
	selectAvailableActions,
	selectCombatView,
	selectEncounterContext,
	selectHeroProgression,
	type EngineAction,
} from "@app/engine";
import type { RunView } from "@app/shared";
import { Button } from "../../../components/Button";
import { GameLayout } from "../../../components/GameLayout";
import { GameMainPanel } from "../../../components/GameMainPanel";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { CombatActionBar } from "./CombatActionBar";
import { Battlefield } from "./Battlefield";
import { CombatSidebar } from "./CombatSidebar";
import { CombatantPanel } from "./CombatantPanel";
import { formatTitle } from "../../../presentation/effects";
import { resolveImageUrl } from "../../../utils/image";

type CombatViewProps = {
	run: RunView;
};

export function CombatView({ run }: CombatViewProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);

	const { hero } = run.state;
	const combatView = selectCombatView(run.state);

	if (!combatView) {
		return <p>Combat state is unavailable.</p>;
	}

	const { battleNumber, combat, gold, goldMultiplier, zone } = combatView;
	const heroClass = CLASSES_BY_ID[hero.classId];
	const heroProgression = selectHeroProgression(run.state);
	const nextZone = selectEncounterContext(battleNumber + 10).zone;
	const zoneLabel = formatTitle(zone);
	const isEnemySlain = combat.status === "player_won";
	const availableActions = selectAvailableActions(run.state);
	const availableActionTypes = new Set(availableActions.map((action) => action.type));
	const availableSkillIds = new Set(
		availableActions.flatMap((action) =>
			action.type === "PLAYER_USE_SKILL" ? [action.skillId] : [],
		),
	);
	const canUseHealingPotion = availableActions.some(
		(action) =>
			action.type === "PLAYER_USE_CONSUMABLE" && action.consumableType === "healingPotion",
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

	function handleSkipTurn() {
		submitAction(
			{
				type: "PLAYER_SKIP_TURN",
			},
			"Unable to skip the turn. Please try again.",
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

	function handleUseHealingPotion() {
		submitAction(
			{
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			},
			"Unable to use a health potion. Please try again.",
		);
	}

	function handleOpenSidebar() {
		setSidebarOpen(true);
	}

	function handleCloseSidebar() {
		setSidebarOpen(false);
	}

	return (
		<GameLayout>
			<CombatSidebar
				open={sidebarOpen}
				onClose={handleCloseSidebar}
				heroName={combat.player.name}
				heroClassId={hero.classId}
				heroLevel={combat.player.level}
				currentHp={combat.player.currentHp}
				maxHp={combat.player.maxHp}
				progression={heroProgression}
				activeEffects={combat.player.activeEffects}
				battleNumber={battleNumber}
				gold={gold}
				goldMultiplier={goldMultiplier}
				zoneLabel={zoneLabel}
				entries={combat.log}
			/>

			<GameMainPanel
				mobileHeader={
					<Button variant="primary" type="button" onClick={handleOpenSidebar}>
						Log
					</Button>
				}
				contentClassName="flex min-h-0 flex-1 flex-col gap-4"
				actions={
					<CombatActionBar
						player={combat.player}
						isPending={applyRunAction.isPending}
						canBasicAttack={availableActionTypes.has("PLAYER_BASIC_ATTACK")}
						canSkipTurn={availableActionTypes.has("PLAYER_SKIP_TURN")}
						canUseHealingPotion={canUseHealingPotion}
						availableSkillIds={availableSkillIds}
						healingPotions={combatView.healingPotions}
						maxHealingPotions={combatView.maxHealingPotions}
						canContinue={availableActionTypes.has("CONTINUE_TO_NEXT_COMBAT")}
						canReturnToTown={availableActionTypes.has("RETURN_TO_TOWN")}
						isEnemySlain={isEnemySlain}
						onBasicAttack={handleBasicAttack}
						onSkipTurn={handleSkipTurn}
						onUseHealingPotion={handleUseHealingPotion}
						onUseSkill={handleUseSkill}
						onContinue={handleContinue}
						onReturnToTown={handleReturnToTown}
					/>
				}
			>
				<section className="grid gap-3 md:-mt-1 md:block" aria-label="Combatants">
					<div className="md:hidden">
						<CombatantPanel
							combatant={combat.player}
							identity={`${combat.player.name} the ${heroClass.name}`}
							ariaLabel="Hero"
						/>
					</div>
					<CombatantPanel
						key={combat.enemy.id}
						combatant={combat.enemy}
						identity={combat.enemy.name}
						ariaLabel="Enemy"
						isBoss={combat.encounterType === "boss"}
						statusLabel={isEnemySlain ? "SLAIN" : undefined}
					/>
				</section>

				<Battlefield
					enemyId={combat.enemy.id}
					enemyCurrentHp={combat.enemy.currentHp}
					entries={combat.log}
					enemyPortrait={resolveImageUrl(combat.enemy.portrait)}
					enemyName={combat.enemy.name}
					isEnemySlain={isEnemySlain}
					nextZone={nextZone}
					zone={zone}
				/>
			</GameMainPanel>
		</GameLayout>
	);
}
