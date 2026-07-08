import { SKILLS_BY_ID, type SkillId } from "@app/content";
import type { CombatantSkillState, CombatantState } from "@app/engine";
import { ActionBarGroup, ActionBarTray, ActionSlotButton } from "../../../components/ActionBar";
import { Tooltip } from "../../../components/Tooltip";
import { SkillTooltipContent } from "../../../components/tooltips/SkillTooltipContent";
import attackIcon from "../../../assets/images/actions/Skill_Attack.png";
import continueIcon from "../../../assets/images/actions/Skill_Move.png";
import townIcon from "../../../assets/images/actions/Town_01.png";
import skipTurnIcon from "../../../assets/images/icons/skill_3_stuned.png";
import healingPotionIcon from "../../../assets/images/actions/Res_49_health.png";

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
				disabled={isPending || !canBasicAttack}
				icon={attackIcon}
				onClick={onBasicAttack}
			/>
			{player.skills.map((skill) => (
				<SkillSlot
					key={skill.skillId}
					skill={skill}
					disabled={isPending || !availableSkillIds.has(skill.skillId)}
					onUseSkill={onUseSkill}
				/>
			))}
			<ActionSlotButton
				ariaLabel="Skip turn"
				disabled={isPending || !canSkipTurn}
				icon={skipTurnIcon}
				onClick={onSkipTurn}
			/>
			<ActionSlotButton
				ariaLabel="Use health potion"
				disabled={isPending || !canUseHealingPotion}
				icon={healingPotionIcon}
				label={`${healingPotions}/${maxHealingPotions}`}
				labelClassName="text-primary"
				onClick={onUseHealingPotion}
			/>
		</>
	);
}

type RunActionSlotsProps = {
	isPending: boolean;
	canContinue: boolean;
	canReturnToTown: boolean;
	onContinue: () => void;
	onReturnToTown: () => void;
};

function RunActionSlots({
	isPending,
	canContinue,
	canReturnToTown,
	onContinue,
	onReturnToTown,
}: RunActionSlotsProps) {
	return (
		<>
			<ActionSlotButton
				ariaLabel="Return to town"
				disabled={isPending || !canReturnToTown}
				icon={townIcon}
				onClick={onReturnToTown}
			/>
			<ActionSlotButton
				ariaLabel="Continue to next battle"
				disabled={isPending || !canContinue}
				icon={continueIcon}
				onClick={onContinue}
			/>
		</>
	);
}

type SkillSlotProps = {
	skill: CombatantSkillState;
	disabled: boolean;
	onUseSkill: (skillId: SkillId) => void;
};

function SkillSlot({ skill, disabled, onUseSkill }: SkillSlotProps) {
	const definition = SKILLS_BY_ID[skill.skillId];
	const usesLabel = getUsesLabel(skill, definition.maxUses);

	return (
		<Tooltip
			content={<SkillTooltipContent skill={skill} definition={definition} />}
			className="w-16 sm:w-20"
			contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
		>
			<ActionSlotButton
				disabled={disabled}
				ariaLabel={disabled ? `${definition.name} unavailable` : `Use ${definition.name}`}
				icon={definition.icon}
				label={usesLabel ?? undefined}
				labelClassName="text-primary"
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
