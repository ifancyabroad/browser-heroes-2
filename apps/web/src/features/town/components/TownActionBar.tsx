import clsx from "clsx";
import restIcon from "../../../assets/images/actions/Skill_Rest.png";
import rerollIcon from "../../../assets/images/actions/Skill_Dice.png";
import enterCombatIcon from "../../../assets/images/actions/Skill_Move.png";
import healingPotionIcon from "../../../assets/images/actions/Res_49_health.png";

type TownActionBarProps = {
	isPending: boolean;
	canRest: boolean;
	canReroll: boolean;
	canBuyHealingPotion: boolean;
	canEnterCombat: boolean;
	restCost: number;
	rerollCost: number;
	healingPotionCost: number;
	onRest: () => void;
	onReroll: () => void;
	onBuyHealingPotion: () => void;
	onEnterCombat: () => void;
};

export function TownActionBar({
	isPending,
	canRest,
	canReroll,
	canBuyHealingPotion,
	canEnterCombat,
	restCost,
	rerollCost,
	healingPotionCost,
	onRest,
	onReroll,
	onBuyHealingPotion,
	onEnterCombat,
}: TownActionBarProps) {
	return (
		<section aria-label="Town actions">
			<div className="flex flex-wrap justify-end gap-1 sm:gap-2">
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
					ariaLabel={`Buy health potion for ${healingPotionCost} gold`}
					disabled={isPending || !canBuyHealingPotion}
					icon={healingPotionIcon}
					label={`${healingPotionCost}g`}
					onClick={onBuyHealingPotion}
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
		"relative aspect-square w-16 overflow-hidden bg-bg-elevated transition-colors sm:w-20",
		"flex shrink-0 items-center justify-center text-center",
		disabled
			? "cursor-not-allowed opacity-60"
			: "cursor-pointer hover:bg-border/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
	);
}
