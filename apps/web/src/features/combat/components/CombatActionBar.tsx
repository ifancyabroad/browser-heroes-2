import { SKILLS_BY_ID, type SkillId } from "@app/content";
import type { CombatantSkillState, CombatantState } from "@app/engine";
import { ActionBarGroup, ActionBarTray, ActionSlotButton } from "../../../components/ActionBar";
import { Tooltip } from "../../../components/Tooltip";
import {
	ACTION_PENDING_DETAIL,
	ActionTooltipContent,
} from "../../../components/tooltips/ActionTooltipContent";
import { SkillTooltipContent } from "../../../components/tooltips/SkillTooltipContent";
import attackIcon from "../../../assets/images/actions/Skill_Attack.png";
import continueIcon from "../../../assets/images/actions/Skill_Swords.png";
import townIcon from "../../../assets/images/actions/Town_01.png";
import skipTurnIcon from "../../../assets/images/actions/Quest_20_flag.png";
import healingPotionIcon from "../../../assets/images/actions/Res_49_health.png";
import { resolveImageUrl } from "../../../utils/image";

type CombatActionBarProps = {
	player: CombatantState;
	isPending: boolean;
	canBasicAttack: boolean;
	canSkipTurn: boolean;
	canUseHealingPotion: boolean;
	availableSkillIds: ReadonlySet<SkillId>;
	healingPotions: number;
	maxHealingPotions: number;
	canContinue: boolean;
	canReturnToTown: boolean;
	isEnemySlain: boolean;
	onBasicAttack: () => void;
	onSkipTurn: () => void;
	onUseHealingPotion: () => void;
	onUseSkill: (skillId: SkillId) => void;
	onContinue: () => void;
	onReturnToTown: () => void;
};

export function CombatActionBar({
	player,
	isPending,
	canBasicAttack,
	canSkipTurn,
	canUseHealingPotion,
	availableSkillIds,
	healingPotions,
	maxHealingPotions,
	canContinue,
	canReturnToTown,
	isEnemySlain,
	onBasicAttack,
	onSkipTurn,
	onUseHealingPotion,
	onUseSkill,
	onContinue,
	onReturnToTown,
}: CombatActionBarProps) {
	return (
		<section aria-label="Command bar">
			<ActionBarTray>
				<ActionBarGroup
					aria-label="Combat actions"
					className="justify-end md:justify-start"
				>
					<CombatSlots
						player={player}
						isPending={isPending}
						canBasicAttack={canBasicAttack}
						canSkipTurn={canSkipTurn}
						canUseHealingPotion={canUseHealingPotion}
						availableSkillIds={availableSkillIds}
						healingPotions={healingPotions}
						maxHealingPotions={maxHealingPotions}
						onBasicAttack={onBasicAttack}
						onSkipTurn={onSkipTurn}
						onUseHealingPotion={onUseHealingPotion}
						onUseSkill={onUseSkill}
					/>
				</ActionBarGroup>

				<ActionBarGroup aria-label="Run actions" className="justify-end">
					<RunActionSlots
						isPending={isPending}
						canContinue={canContinue}
						canReturnToTown={canReturnToTown}
						isEnemySlain={isEnemySlain}
						onContinue={onContinue}
						onReturnToTown={onReturnToTown}
					/>
				</ActionBarGroup>
			</ActionBarTray>
		</section>
	);
}

type CombatSlotsProps = {
	player: CombatantState;
	isPending: boolean;
	canBasicAttack: boolean;
	canSkipTurn: boolean;
	canUseHealingPotion: boolean;
	availableSkillIds: ReadonlySet<SkillId>;
	healingPotions: number;
	maxHealingPotions: number;
	onBasicAttack: () => void;
	onSkipTurn: () => void;
	onUseHealingPotion: () => void;
	onUseSkill: (skillId: SkillId) => void;
};

function CombatSlots({
	player,
	isPending,
	canBasicAttack,
	canSkipTurn,
	canUseHealingPotion,
	availableSkillIds,
	healingPotions,
	maxHealingPotions,
	onBasicAttack,
	onSkipTurn,
	onUseHealingPotion,
	onUseSkill,
}: CombatSlotsProps) {
	return (
		<>
			<ActionSlotButton
				ariaLabel={`Basic attack: ${player.basicAttack.name}`}
				available={canBasicAttack}
				icon={attackIcon}
				loading={isPending}
				tooltip={
					<ActionTooltipContent
						title="Basic attack"
						detail={getBasicAttackTooltipDetail({
							isPending,
							available: canBasicAttack,
							attackName: player.basicAttack.name,
						})}
					/>
				}
				onClick={onBasicAttack}
			/>
			{player.skills.map((skill) => (
				<SkillSlot
					key={skill.skillId}
					skill={skill}
					available={availableSkillIds.has(skill.skillId)}
					loading={isPending}
					onUseSkill={onUseSkill}
				/>
			))}
			<ActionSlotButton
				ariaLabel="Skip turn"
				available={canSkipTurn}
				icon={skipTurnIcon}
				loading={isPending}
				tooltip={
					<ActionTooltipContent
						title="Skip turn"
						detail={getCombatActionTooltipDetail({
							isPending,
							available: canSkipTurn,
							availableDetail: "End the round without acting.",
						})}
					/>
				}
				onClick={onSkipTurn}
			/>
			<ActionSlotButton
				ariaLabel="Use health potion"
				available={canUseHealingPotion}
				icon={healingPotionIcon}
				label={`${healingPotions}/${maxHealingPotions}`}
				labelClassName="text-primary"
				loading={isPending}
				tooltip={
					<ActionTooltipContent
						title="Use health potion"
						detail={getPotionTooltipDetail({
							isPending,
							available: canUseHealingPotion,
							currentHp: player.currentHp,
							maxHp: player.maxHp,
							healingPotions,
						})}
					/>
				}
				onClick={onUseHealingPotion}
			/>
		</>
	);
}

type RunActionSlotsProps = {
	isPending: boolean;
	canContinue: boolean;
	canReturnToTown: boolean;
	isEnemySlain: boolean;
	onContinue: () => void;
	onReturnToTown: () => void;
};

function RunActionSlots({
	isPending,
	canContinue,
	canReturnToTown,
	isEnemySlain,
	onContinue,
	onReturnToTown,
}: RunActionSlotsProps) {
	return (
		<>
			<ActionSlotButton
				ariaLabel="Return to town"
				available={canReturnToTown}
				icon={townIcon}
				loading={isPending}
				tooltip={
					<ActionTooltipContent
						title="Return to town"
						detail={getRunActionTooltipDetail({
							isPending,
							available: canReturnToTown,
							isEnemySlain,
							availableDetail: "End the streak and prepare in town.",
						})}
					/>
				}
				onClick={onReturnToTown}
			/>
			<ActionSlotButton
				ariaLabel="Continue to next battle"
				available={canContinue}
				icon={continueIcon}
				loading={isPending}
				tooltip={
					<ActionTooltipContent
						title="Continue"
						detail={getRunActionTooltipDetail({
							isPending,
							available: canContinue,
							isEnemySlain,
							availableDetail: "Continue directly to the next battle.",
						})}
					/>
				}
				onClick={onContinue}
			/>
		</>
	);
}

type SkillSlotProps = {
	skill: CombatantSkillState;
	available: boolean;
	loading: boolean;
	onUseSkill: (skillId: SkillId) => void;
};

function SkillSlot({ skill, available, loading, onUseSkill }: SkillSlotProps) {
	const definition = SKILLS_BY_ID[skill.skillId];
	const usesLabel = getUsesLabel(skill, definition.maxUses);

	return (
		<Tooltip
			content={<SkillTooltipContent skill={skill} definition={definition} />}
			className="w-16 sm:w-20"
			contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
			referenceTabIndex={available && !loading ? null : 0}
		>
			<ActionSlotButton
				available={available}
				ariaLabel={available ? `Use ${definition.name}` : `${definition.name} unavailable`}
				icon={resolveImageUrl(definition.icon)}
				label={usesLabel ?? undefined}
				labelClassName="text-primary"
				loading={loading}
				onClick={() => onUseSkill(skill.skillId)}
			/>
		</Tooltip>
	);
}

function getUsesLabel(skill: CombatantSkillState, maxUses: number | undefined) {
	if (!maxUses) {
		return null;
	}

	return `${skill.chargesRemaining ?? maxUses}/${maxUses}`;
}

function getBasicAttackTooltipDetail({
	isPending,
	available,
	attackName,
}: {
	isPending: boolean;
	available: boolean;
	attackName: string;
}) {
	return getCombatActionTooltipDetail({
		isPending,
		available,
		availableDetail: `Attack with ${attackName}.`,
	});
}

function getCombatActionTooltipDetail({
	isPending,
	available,
	availableDetail,
}: {
	isPending: boolean;
	available: boolean;
	availableDetail: string;
}) {
	if (isPending) return ACTION_PENDING_DETAIL;
	if (!available) return "Unavailable after combat ends.";
	return availableDetail;
}

function getPotionTooltipDetail({
	isPending,
	available,
	currentHp,
	maxHp,
	healingPotions,
}: {
	isPending: boolean;
	available: boolean;
	currentHp: number;
	maxHp: number;
	healingPotions: number;
}) {
	if (isPending) return ACTION_PENDING_DETAIL;
	if (healingPotions <= 0) return "No health potions remaining.";
	if (currentHp >= maxHp) return "Already at full health.";
	if (!available) return "Unavailable after combat ends.";
	return "Restore health using one potion.";
}

function getRunActionTooltipDetail({
	isPending,
	available,
	isEnemySlain,
	availableDetail,
}: {
	isPending: boolean;
	available: boolean;
	isEnemySlain: boolean;
	availableDetail: string;
}) {
	if (isPending) return ACTION_PENDING_DETAIL;
	if (available) return availableDetail;
	if (isEnemySlain) return "Resolve the current reward or level-up choice first.";
	return "Available after winning the battle.";
}
