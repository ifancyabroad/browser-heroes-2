import type { EquipmentSlot } from "@app/content";
import {
	selectAvailableActions,
	selectTownView,
	type EngineAction,
	type TownShopSlotView,
} from "@app/engine";
import type { RunView } from "@app/shared";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { GameLayout } from "../../../components/GameLayout";
import { GameMainPanel } from "../../../components/GameMainPanel";
import { HeroSidebar } from "./HeroSidebar";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { TownActionBar } from "./TownActionBar";
import { TownReplacementModal } from "./TownReplacementModal";
import { TownShopGrid } from "./TownShopGrid";

type TownViewProps = {
	run: RunView;
};

export function TownView({ run }: TownViewProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [replacementSlot, setReplacementSlot] = useState<TownShopSlotView | null>(null);
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);
	const townView = selectTownView(run.state);
	const availableActions = selectAvailableActions(run.state);
	const availableActionTypes = new Set(availableActions.map((action) => action.type));

	if (!townView) {
		return <p>Town state is unavailable.</p>;
	}

	function submitAction(action: EngineAction, fallbackErrorMessage: string) {
		applyRunAction.mutate(
			{
				runId: run.id,
				action,
			},
			{
				onSuccess: ({ result }) => {
					if (!result.ok) {
						showError(getEngineErrorMessage(result.error));
					}
				},
				onError: () => {
					showError(fallbackErrorMessage);
				},
			},
		);
	}

	function handleBuy(slot: TownShopSlotView) {
		if (slot.purchased || !slot.canAfford || applyRunAction.isPending) {
			return;
		}

		if (slot.requiresEquipmentSlotSelection) {
			setReplacementSlot(slot);
			return;
		}

		submitAction(
			{
				type: "BUY_ITEM",
				shopSlotId: slot.id,
			},
			"Unable to buy that item. Please try again.",
		);
	}

	function handleConfirmReplacement(equipmentSlot: EquipmentSlot) {
		if (!replacementSlot) {
			return;
		}

		submitAction(
			{
				type: "BUY_ITEM",
				shopSlotId: replacementSlot.id,
				equipmentSlot,
			},
			"Unable to buy that item. Please try again.",
		);
		setReplacementSlot(null);
	}

	function handleRest() {
		submitAction(
			{
				type: "REST_AT_TOWN",
			},
			"Unable to rest. Please try again.",
		);
	}

	function handleReroll() {
		submitAction(
			{
				type: "REROLL_SHOP",
			},
			"Unable to reroll the shop. Please try again.",
		);
	}

	function handleBuyHealingPotion() {
		submitAction(
			{
				type: "BUY_CONSUMABLE",
				consumableType: "healingPotion",
			},
			"Unable to buy a health potion. Please try again.",
		);
	}

	function handleEnterCombat() {
		submitAction(
			{
				type: "ENTER_COMBAT",
			},
			"Unable to enter combat. Please try again.",
		);
	}

	function handleOpenSidebar() {
		setSidebarOpen(true);
	}

	function handleCloseSidebar() {
		setSidebarOpen(false);
	}

	return (
		<GameLayout>
			<div className="flex min-h-0 flex-1 overflow-hidden bg-bg-base text-base text-text">
				<HeroSidebar
					run={run}
					battleNumber={townView.battleNumber}
					day={townView.day}
					gold={townView.gold}
					zone={townView.zone}
					open={sidebarOpen}
					onClose={handleCloseSidebar}
				/>

				<GameMainPanel
					mobileHeader={
						<Button className="text-primary" type="button" onClick={handleOpenSidebar}>
							Hero
						</Button>
					}
					actions={
						<TownActionBar
							isPending={applyRunAction.isPending}
							gold={townView.gold}
							canAffordRest={townView.canAffordRest}
							canRest={
								availableActionTypes.has("REST_AT_TOWN") &&
								townView.canAffordRest &&
								!townView.isFullyHealed
							}
							canAffordReroll={townView.canAffordReroll}
							canReroll={
								availableActionTypes.has("REROLL_SHOP") && townView.canAffordReroll
							}
							canAffordHealingPotion={townView.canAffordHealingPotion}
							canBuyHealingPotion={
								availableActionTypes.has("BUY_CONSUMABLE") &&
								townView.canBuyHealingPotion
							}
							canEnterCombat={availableActionTypes.has("ENTER_COMBAT")}
							restCost={townView.restCost}
							rerollCost={townView.rerollCost}
							healingPotionCost={townView.healingPotionCost}
							onRest={handleRest}
							onReroll={handleReroll}
							onBuyHealingPotion={handleBuyHealingPotion}
							onEnterCombat={handleEnterCombat}
						/>
					}
				>
					<TownShopGrid
						shopSlots={townView.shopSlots}
						isPending={applyRunAction.isPending}
						onBuy={handleBuy}
					/>
				</GameMainPanel>

				{replacementSlot && (
					<TownReplacementModal
						slot={replacementSlot}
						isPending={applyRunAction.isPending}
						onBack={() => setReplacementSlot(null)}
						onConfirm={handleConfirmReplacement}
					/>
				)}
			</div>
		</GameLayout>
	);
}
