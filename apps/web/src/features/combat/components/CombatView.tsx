import type { SkillId } from "@app/content";
import { selectAvailableActions, selectCombatView, type EngineAction } from "@app/engine";
import type { RunView } from "@app/shared";
import { GameLayout } from "../../../components/GameLayout";
import { GameNavigation } from "../../../components/GameNavigation";
import { GameMainPanel, GamePanelContainer } from "../../../components/GameMainPanel";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { CombatActionBar } from "./CombatActionBar";
import { Battlefield } from "./Battlefield";
import { HeroSummary } from "../../hero";
import { EnemySummary } from "./EnemySummary";
import { CombatLogPanel } from "./CombatLogPanel";
import { resolveImageUrl } from "../../../utils/image";

type CombatViewProps = {
	run: RunView;
};

export function CombatView({ run }: CombatViewProps) {
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);

	const combatView = selectCombatView(run.state);

	if (!combatView) {
		return <p>Combat state is unavailable.</p>;
	}

	const {
		zoneBattleNumber,
		battlesPerZone,
		combat,
		gold,
		goldMultiplier,
		zone,
		nextZoneOptions,
	} = combatView;
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
			"Unable to continue to the next battle. Please try again.",
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
			"Unable to use a healing potion. Please try again.",
		);
	}

	return (
		<GameLayout>
			<GameMainPanel>
				<header className="shrink-0">
					<GamePanelContainer className="py-3">
						<GameNavigation gold={gold} showCombatLog />
					</GamePanelContainer>
				</header>
				<div className="min-h-0 flex-1 overflow-y-auto">
					<GamePanelContainer className="flex h-full flex-col py-3">
						<div className="grid min-h-0 flex-1 grid-rows-[auto_auto_minmax(12rem,1fr)] gap-2 md:grid-cols-[20rem_minmax(0,1fr)] md:grid-rows-[auto_minmax(16rem,1fr)] md:gap-x-6">
							<HeroSummary run={run} />
							<EnemySummary
								key={combat.enemy.id}
								enemy={combat.enemy}
								descriptor={combatView.enemyDescriptor}
							/>
							<CombatLogPanel
								entries={combat.log}
								className="hidden bg-bg-base p-3 md:block"
							/>

							<div className="flex min-h-0">
								<Battlefield
									turnOrder={combatView.turnOrder}
									heroId={combat.player.id}
									enemyId={combat.enemy.id}
									enemyCurrentHp={combat.enemy.currentHp}
									entries={combat.log}
									enemyPortrait={resolveImageUrl(combat.enemy.portrait)}
									enemyName={combat.enemy.name}
									isEnemySlain={isEnemySlain}
									zoneBattleNumber={zoneBattleNumber}
									battlesPerZone={battlesPerZone}
									goldMultiplier={goldMultiplier}
									nextZoneOptions={nextZoneOptions}
									zone={zone}
								/>
							</div>
						</div>
						<div className="sticky bottom-0 z-20 shrink-0 py-3">
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
						</div>
					</GamePanelContainer>
				</div>
			</GameMainPanel>
		</GameLayout>
	);
}
