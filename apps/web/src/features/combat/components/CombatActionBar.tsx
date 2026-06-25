import clsx from "clsx";
import { SKILLS_BY_ID } from "@app/content";
import type { CombatantSkillState, CombatantState } from "@app/engine";

// TODO: Replace with engine-owned action slot capacity once action slots become gameplay state.
const combatActionSlotCount = 8;

type CombatActionBarProps = {
	player: CombatantState;
	isPending: boolean;
	isVictory: boolean;
	onBasicAttack: () => void;
	onContinue: () => void;
	onReturnToTown: () => void;
};

export function CombatActionBar({
	player,
	isPending,
	isVictory,
	onBasicAttack,
	onContinue,
	onReturnToTown,
}: CombatActionBarProps) {
	const usedSlotCount = isVictory ? 2 : 1 + player.skills.length;
	const emptySlotCount = Math.max(0, combatActionSlotCount - usedSlotCount);

	return (
		<section
			className="flex flex-wrap justify-center gap-1 sm:gap-2"
			aria-label="Combat actions"
		>
			{isVictory ? (
				<>
					<TextActionSlot disabled={isPending} label="Continue" onClick={onContinue} />
					<TextActionSlot disabled={isPending} label="Town" onClick={onReturnToTown} />
				</>
			) : (
				<>
					<BasicAttackSlot
						basicAttackName={player.basicAttack.name}
						disabled={isPending}
						onClick={onBasicAttack}
					/>
					{player.skills.map((skill) => (
						<SkillSlot key={skill.skillId} skill={skill} />
					))}
				</>
			)}

			{Array.from({ length: emptySlotCount }, (_, index) => (
				<EmptyActionSlot key={`empty-action-${index}`} />
			))}
		</section>
	);
}

type BasicAttackSlotProps = {
	basicAttackName: string;
	disabled: boolean;
	onClick: () => void;
};

function BasicAttackSlot({ basicAttackName, disabled, onClick }: BasicAttackSlotProps) {
	return (
		<button
			type="button"
			className={getActionSlotClassName(disabled)}
			disabled={disabled}
			aria-label={`Basic attack: ${basicAttackName}`}
			onClick={onClick}
		>
			<ActionSlotImage src={SKILLS_BY_ID.attack.icon} />
		</button>
	);
}

function SkillSlot({ skill }: { skill: CombatantSkillState }) {
	const definition = SKILLS_BY_ID[skill.skillId];
	const usesLabel = getUsesLabel(skill, definition.maxUses);

	return (
		<button
			type="button"
			className={getActionSlotClassName(true)}
			disabled
			aria-label={`${definition.name} unavailable`}
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
	);
}

type TextActionSlotProps = {
	disabled: boolean;
	label: string;
	onClick: () => void;
};

function TextActionSlot({ disabled, label, onClick }: TextActionSlotProps) {
	return (
		<button
			type="button"
			className={getActionSlotClassName(disabled)}
			disabled={disabled}
			onClick={onClick}
		>
			<span className="text-text-bright">{label}</span>
		</button>
	);
}

function EmptyActionSlot() {
	return (
		<div className="h-16 w-16 shrink-0 border-2 border-dashed border-border/70 sm:h-20 sm:w-20" />
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
		"relative h-16 w-16 overflow-hidden bg-bg-elevated transition-colors sm:h-20 sm:w-20",
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
