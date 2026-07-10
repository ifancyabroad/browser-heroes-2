import {
	ActionBarGroup,
	ActionBarTray,
	ActionSlotButton,
	ActionSlotDisplay,
} from "../../../components/ActionBar";
import restIcon from "../../../assets/images/actions/Skill_Rest.png";
import rerollIcon from "../../../assets/images/actions/Skill_Dice.png";
import enterCombatIcon from "../../../assets/images/actions/Skill_Move.png";
import healingPotionIcon from "../../../assets/images/actions/Res_49_health.png";
import goldIcon from "../../../assets/images/icons/GoldCoinTen.png";

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

				<ActionBarGroup aria-label="Town action buttons" className="justify-end">
					<ActionSlotButton
						ariaLabel={`Reroll shop for ${rerollCost} gold`}
						available={canReroll}
						icon={rerollIcon}
						label={`${rerollCost}g`}
						labelClassName={canAffordReroll ? "text-text-bright" : "text-error"}
						loading={isPending}
						onClick={onReroll}
					/>
					<ActionSlotButton
						ariaLabel={`Buy health potion for ${healingPotionCost} gold. ${healingPotions} of ${maxHealingPotions} carried`}
						available={canBuyHealingPotion}
						icon={healingPotionIcon}
						label={`${healingPotionCost}g`}
						labelClassName={canAffordHealingPotion ? "text-text-bright" : "text-error"}
						loading={isPending}
						onClick={onBuyHealingPotion}
						topLeftLabel={`${healingPotions}/${maxHealingPotions}`}
						topLeftLabelClassName="text-primary"
					/>
					<ActionSlotButton
						ariaLabel={`Rest for ${restCost} gold`}
						available={canRest}
						icon={restIcon}
						label={`${restCost}g`}
						labelClassName={canAffordRest ? "text-text-bright" : "text-error"}
						loading={isPending}
						onClick={onRest}
					/>
					<ActionSlotButton
						ariaLabel="Enter combat"
						available={canEnterCombat}
						icon={enterCombatIcon}
						loading={isPending}
						onClick={onEnterCombat}
					/>
				</ActionBarGroup>
			</ActionBarTray>
		</section>
	);
}
