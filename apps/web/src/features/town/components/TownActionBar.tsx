import {
	ActionBarGroup,
	ActionBarTray,
	ActionSlotButton,
	ActionSlotDisplay,
	getRemainingUsesClassName,
} from "../../../components/ActionBar";
import restIcon from "../../../assets/images/actions/Skill_Rest.png";
import rerollIcon from "../../../assets/images/actions/Skill_Dice.png";
import enterCombatIcon from "../../../assets/images/actions/Skill_Swords.png";
import healingPotionIcon from "../../../assets/images/actions/Res_49_health.png";
import goldIcon from "../../../assets/images/icons/GoldCoinTen.png";
import {
	ACTION_PENDING_DETAIL,
	ActionTooltipContent,
} from "../../../components/tooltips/ActionTooltipContent";

type TownActionBarProps = {
	isPending: boolean;
	gold: number;
	canAffordRest: boolean;
	canRest: boolean;
	canAffordReroll: boolean;
	canReroll: boolean;
	canAffordHealingPotion: boolean;
	canBuyHealingPotion: boolean;
	canEnterCombat: boolean;
	restCost: number;
	rerollCost: number;
	healingPotions: number;
	maxHealingPotions: number;
	healingPotionCost: number;
	onRest: () => void;
	onReroll: () => void;
	onBuyHealingPotion: () => void;
	onEnterCombat: () => void;
};

export function TownActionBar({
	isPending,
	gold,
	canAffordRest,
	canRest,
	canAffordReroll,
	canReroll,
	canAffordHealingPotion,
	canBuyHealingPotion,
	canEnterCombat,
	restCost,
	rerollCost,
	healingPotions,
	maxHealingPotions,
	healingPotionCost,
	onRest,
	onReroll,
	onBuyHealingPotion,
	onEnterCombat,
}: TownActionBarProps) {
	return (
		<section aria-label="Town actions">
			<ActionBarTray>
				<ActionBarGroup aria-label="Town resources">
					<ActionSlotDisplay
						ariaLabel={`${gold} gold`}
						icon={goldIcon}
						label={`${gold}g`}
						labelClassName="text-primary"
					/>
				</ActionBarGroup>

				<ActionBarGroup aria-label="Town action buttons">
					<ActionSlotButton
						ariaLabel={`Reroll shop for ${rerollCost} gold`}
						available={canReroll}
						icon={rerollIcon}
						label={`${rerollCost}g`}
						labelClassName={canAffordReroll ? "text-text-bright" : "text-error"}
						loading={isPending}
						tooltip={
							<ActionTooltipContent
								title="Reroll shop"
								detail={getRerollTooltipDetail({
									isPending,
									canAffordReroll,
									rerollCost,
								})}
							/>
						}
						onClick={onReroll}
					/>
					<ActionSlotButton
						ariaLabel={`Buy healing potion for ${healingPotionCost} gold. ${healingPotions} of ${maxHealingPotions} carried`}
						available={canBuyHealingPotion}
						icon={healingPotionIcon}
						label={`${healingPotionCost}g`}
						labelClassName={canAffordHealingPotion ? "text-text-bright" : "text-error"}
						loading={isPending}
						tooltip={
							<ActionTooltipContent
								title="Buy healing potion"
								detail={getPotionTooltipDetail({
									isPending,
									canAffordHealingPotion,
									healingPotions,
									maxHealingPotions,
									healingPotionCost,
								})}
							/>
						}
						onClick={onBuyHealingPotion}
						topLeftLabel={`${healingPotions}/${maxHealingPotions}`}
						topLeftLabelClassName={getRemainingUsesClassName(
							healingPotions,
							maxHealingPotions,
						)}
					/>
					<ActionSlotButton
						ariaLabel={`Rest for ${restCost} gold`}
						available={canRest}
						icon={restIcon}
						label={`${restCost}g`}
						labelClassName={canAffordRest ? "text-text-bright" : "text-error"}
						loading={isPending}
						tooltip={
							<ActionTooltipContent
								title="Rest"
								detail={getRestTooltipDetail({
									isPending,
									canAffordRest,
									restCost,
								})}
							/>
						}
						onClick={onRest}
					/>
					<ActionSlotButton
						ariaLabel="Enter battle"
						available={canEnterCombat}
						icon={enterCombatIcon}
						loading={isPending}
						tooltip={
							<ActionTooltipContent
								title="Enter battle"
								detail={
									isPending ? ACTION_PENDING_DETAIL : "Begin the next battle."
								}
							/>
						}
						onClick={onEnterCombat}
					/>
				</ActionBarGroup>
			</ActionBarTray>
		</section>
	);
}

function getRerollTooltipDetail({
	isPending,
	canAffordReroll,
	rerollCost,
}: {
	isPending: boolean;
	canAffordReroll: boolean;
	rerollCost: number;
}) {
	if (isPending) {
		return ACTION_PENDING_DETAIL;
	}
	if (!canAffordReroll) {
		return `Requires ${rerollCost} gold.`;
	}
	return `Refresh the shop inventory for ${rerollCost} gold.`;
}

function getPotionTooltipDetail({
	isPending,
	canAffordHealingPotion,
	healingPotions,
	maxHealingPotions,
	healingPotionCost,
}: {
	isPending: boolean;
	canAffordHealingPotion: boolean;
	healingPotions: number;
	maxHealingPotions: number;
	healingPotionCost: number;
}) {
	if (isPending) {
		return ACTION_PENDING_DETAIL;
	}
	if (healingPotions >= maxHealingPotions) {
		return "Potion capacity reached.";
	}
	if (!canAffordHealingPotion) {
		return `Requires ${healingPotionCost} gold.`;
	}
	return `Add one healing potion for ${healingPotionCost} gold.`;
}

function getRestTooltipDetail({
	isPending,
	canAffordRest,
	restCost,
}: {
	isPending: boolean;
	canAffordRest: boolean;
	restCost: number;
}) {
	if (isPending) {
		return ACTION_PENDING_DETAIL;
	}
	if (!canAffordRest) {
		return `Requires ${restCost} gold.`;
	}
	return `Restore all health and skill uses for ${restCost} gold.`;
}
