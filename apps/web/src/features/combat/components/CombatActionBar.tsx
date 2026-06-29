import clsx from "clsx";
import { SKILLS_BY_ID, type SkillId } from "@app/content";
import type { CombatantSkillState, CombatantState } from "@app/engine";
import { Tooltip } from "../../../components/Tooltip";
import attackIcon from "../../../assets/images/actions/Skill_Attack.png";
import continueIcon from "../../../assets/images/actions/Skill_Move.png";
import townIcon from "../../../assets/images/actions/Town_01.png";
import { SkillTooltipContent } from "./SkillTooltipContent";

// TODO: Replace with engine-owned action slot capacity once action slots become gameplay state.
const combatActionSlotCount = 8;

type CombatActionBarProps = {
	player: CombatantState;
	isPending: boolean;
	canBasicAttack: boolean;
	availableSkillIds: ReadonlySet<SkillId>;
	canContinue: boolean;
	canReturnToTown: boolean;
	onBasicAttack: () => void;
	onUseSkill: (skillId: SkillId) => void;
	onContinue: () => void;
	onReturnToTown: () => void;
};

export function CombatActionBar({
	player,
	isPending,
	canBasicAttack,
	availableSkillIds,
	canContinue,
	canReturnToTown,
	onBasicAttack,
	onUseSkill,
	onContinue,
	onReturnToTown,
}: CombatActionBarProps) {
	const usedSlotCount = 1 + player.skills.length;
	const emptySlotCount = Math.max(0, combatActionSlotCount - usedSlotCount);

	return (
		<section aria-label="Command bar">
			<div className="grid grid-cols-5 justify-items-center gap-1 sm:gap-2 md:hidden">
				<CombatSlots
					player={player}
					isPending={isPending}
					canBasicAttack={canBasicAttack}
					availableSkillIds={availableSkillIds}
					onBasicAttack={onBasicAttack}
					onUseSkill={onUseSkill}
				/>
				<EmptyActionSlots count={emptySlotCount} />
				<RunActionSlots
					isPending={isPending}
					canContinue={canContinue}
					canReturnToTown={canReturnToTown}
					onContinue={onContinue}
					onReturnToTown={onReturnToTown}
				/>
			</div>

			<div className="hidden md:flex md:items-start md:justify-between md:gap-2">
				<div className="flex flex-wrap justify-start gap-2" aria-label="Combat actions">
					<CombatSlots
						player={player}
						isPending={isPending}
						canBasicAttack={canBasicAttack}
						availableSkillIds={availableSkillIds}
						onBasicAttack={onBasicAttack}
						onUseSkill={onUseSkill}
					/>
					<EmptyActionSlots count={emptySlotCount} />
				</div>

				<div className="flex flex-wrap justify-end gap-2" aria-label="Run actions">
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
	availableSkillIds: ReadonlySet<SkillId>;
	onBasicAttack: () => void;
	onUseSkill: (skillId: SkillId) => void;
};

function CombatSlots({
	player,
	isPending,
	canBasicAttack,
	availableSkillIds,
	onBasicAttack,
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
	onClick: () => void;
};

function IconActionSlot({ ariaLabel, disabled, icon, onClick }: IconActionSlotProps) {
	return (
		<button
			type="button"
			className={getActionSlotClassName(disabled)}
			disabled={disabled}
			aria-label={ariaLabel}
			onClick={onClick}
		>
			<ActionSlotImage src={icon} />
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
			className="w-full max-w-16 sm:max-w-20 md:w-20 md:max-w-none"
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

function EmptyActionSlot() {
	return (
		<div className="aspect-square w-full max-w-16 shrink-0 border-2 border-dashed border-border/70 sm:max-w-20 md:w-20 md:max-w-none" />
	);
}

function EmptyActionSlots({ count }: { count: number }) {
	return Array.from({ length: count }, (_, index) => (
		<EmptyActionSlot key={`empty-action-${index}`} />
	));
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
		"relative aspect-square w-full max-w-16 overflow-hidden bg-bg-elevated transition-colors sm:max-w-20 md:w-20 md:max-w-none",
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
