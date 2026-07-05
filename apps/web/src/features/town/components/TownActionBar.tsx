import clsx from "clsx";
import restIcon from "../../../assets/images/actions/Skill_Rest.png";
import rerollIcon from "../../../assets/images/actions/Skill_Dice.png";
import enterCombatIcon from "../../../assets/images/actions/Skill_Move.png";

type TownActionBarProps = {
	isPending: boolean;
	canRest: boolean;
	canReroll: boolean;
	canEnterCombat: boolean;
	restCost: number;
	rerollCost: number;
	onRest: () => void;
	onReroll: () => void;
	onEnterCombat: () => void;
};

export function TownActionBar({
	isPending,
	canRest,
	canReroll,
	canEnterCombat,
	restCost,
	rerollCost,
	onRest,
	onReroll,
	onEnterCombat,
}: TownActionBarProps) {
	return (
		<section aria-label="Town actions">
			<div className="grid grid-cols-3 justify-items-center gap-1 sm:gap-2 md:flex md:justify-end">
				<IconActionSlot
					ariaLabel={`Rest for ${restCost} gold`}
					disabled={isPending || !canRest}
					icon={restIcon}
					label={`${restCost}g`}
					onClick={onRest}
				/>
				<IconActionSlot
					ariaLabel={`Reroll shop for ${rerollCost} gold`}
					disabled={isPending || !canReroll}
					icon={rerollIcon}
					label={`${rerollCost}g`}
					onClick={onReroll}
				/>
				<IconActionSlot
					ariaLabel="Enter combat"
					disabled={isPending || !canEnterCombat}
					icon={enterCombatIcon}
					onClick={onEnterCombat}
				/>
			</div>
		</section>
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
			title={ariaLabel}
			onClick={onClick}
		>
			<span className="absolute inset-0 flex items-center justify-center">
				<img
					src={icon}
					alt=""
					loading="lazy"
					className="h-full w-full scale-110 object-cover"
					aria-hidden
				/>
			</span>
			{label && (
				<span className="absolute bottom-1 right-1 bg-bg-base/80 px-1 text-primary">
					{label}
				</span>
			)}
		</button>
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
