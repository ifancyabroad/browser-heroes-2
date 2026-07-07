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
						disabled={isPending || !canReroll}
						icon={rerollIcon}
						label={`${rerollCost}g`}
						labelClassName={canAffordReroll ? undefined : "text-error"}
						onClick={onReroll}
					/>
					<ActionSlotButton
						ariaLabel={`Buy health potion for ${healingPotionCost} gold`}
						disabled={isPending || !canBuyHealingPotion}
						icon={healingPotionIcon}
						label={`${healingPotionCost}g`}
						labelClassName={canAffordHealingPotion ? undefined : "text-error"}
						onClick={onBuyHealingPotion}
					/>
					<ActionSlotButton
						ariaLabel={`Rest for ${restCost} gold`}
						disabled={isPending || !canRest}
						icon={restIcon}
						label={`${restCost}g`}
						labelClassName={canAffordRest ? undefined : "text-error"}
						onClick={onRest}
					/>
					<ActionSlotButton
						ariaLabel="Enter combat"
						disabled={isPending || !canEnterCombat}
						icon={enterCombatIcon}
						onClick={onEnterCombat}
					/>
				</ActionBarGroup>
			</ActionBarTray>
		</section>
	);
}
