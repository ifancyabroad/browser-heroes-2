import clsx from "clsx";
import { SKILLS_BY_ID, type SkillId } from "@app/content";
import type { CombatantSkillState, CombatantState } from "@app/engine";
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
			<div className="flex flex-wrap items-start justify-end gap-1 sm:gap-2 md:justify-between">
				<div
					className="flex flex-wrap justify-end gap-1 sm:gap-2 md:justify-start"
					aria-label="Combat actions"
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
				</div>

				<div className="flex flex-wrap justify-end gap-1 sm:gap-2" aria-label="Run actions">
					<RunActionSlots
						isPending={isPending}
						canContinue={canContinue}
						canReturnToTown={canReturnToTown}
						onContinue={onContinue}
						onReturnToTown={onReturnToTown}
					/>
				</div>
			</div>
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
			<IconActionSlot
				ariaLabel={`Basic attack: ${player.basicAttack.name}`}
				disabled={isPending || !canBasicAttack}
				icon={attackIcon}
				onClick={onBasicAttack}
			/>
			<IconActionSlot
				ariaLabel="Skip turn"
				disabled={isPending || !canSkipTurn}
				icon={skipTurnIcon}
				onClick={onSkipTurn}
			/>
			<IconActionSlot
				ariaLabel="Use health potion"
				disabled={isPending || !canUseHealingPotion}
				icon={healingPotionIcon}
				label={`${healingPotions}/${maxHealingPotions}`}
				onClick={onUseHealingPotion}
			/>
			{player.skills.map((skill) => (
				<SkillSlot
					key={skill.skillId}
					skill={skill}
					disabled={isPending || !availableSkillIds.has(skill.skillId)}
					onUseSkill={onUseSkill}
				/>
			))}
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
			<IconActionSlot
				ariaLabel="Continue to next battle"
				disabled={isPending || !canContinue}
				icon={continueIcon}
				onClick={onContinue}
			/>
			<IconActionSlot
				ariaLabel="Return to town"
				disabled={isPending || !canReturnToTown}
				icon={townIcon}
				onClick={onReturnToTown}
			/>
		</>
	);
}

type IconActionSlotProps = {
	ariaLabel: string;
	disabled: boolean;
	icon: string;
	label?: string;
	onClick: () => void;
};

function IconActionSlot({ ariaLabel, disabled, icon, label, onClick }: IconActionSlotProps) {
	return (
		<button
			type="button"
			className={getActionSlotClassName(disabled)}
			disabled={disabled}
			aria-label={ariaLabel}
			onClick={onClick}
		>
			<ActionSlotImage src={icon} />
			{label && (
				<span className="absolute bottom-1 right-1 bg-bg-base/80 px-1 text-primary">
					{label}
				</span>
			)}
		</button>
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
			<button
				type="button"
				className={getActionSlotClassName(disabled)}
				disabled={disabled}
				aria-label={disabled ? `${definition.name} unavailable` : `Use ${definition.name}`}
				onClick={() => onUseSkill(skill.skillId)}
			>
				<ActionSlotImage src={definition.icon} />
				<span className="absolute left-1 top-1 bg-bg-base/80 px-1 text-text-bright">
					R{skill.rank}
				</span>
				{usesLabel && (
					<span className="absolute bottom-1 right-1 bg-bg-base/80 px-1 text-primary">
						{usesLabel}
					</span>
				)}
			</button>
		</Tooltip>
	);
}

type ActionSlotImageProps = {
	src: string;
};

function ActionSlotImage({ src }: ActionSlotImageProps) {
	return (
		<span className="absolute inset-0 flex items-center justify-center">
			<img
				src={src}
				alt=""
				loading="lazy"
				className="h-full w-full scale-110 object-cover"
				aria-hidden
			/>
		</span>
	);
}

function getActionSlotClassName(disabled: boolean) {
	return clsx(
		"relative aspect-square w-16 overflow-hidden bg-bg-elevated transition-colors sm:w-20",
		"flex shrink-0 items-center justify-center text-center",
		disabled
			? "cursor-not-allowed opacity-60"
			: "cursor-pointer hover:bg-border/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
	);
}

function getUsesLabel(skill: CombatantSkillState, maxUses: number | undefined) {
	if (!maxUses) {
		return null;
	}

	return `${skill.chargesRemaining ?? maxUses}/${maxUses}`;
}
