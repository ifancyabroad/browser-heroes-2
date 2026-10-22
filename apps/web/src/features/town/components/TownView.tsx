import type { EquipmentSlot } from "@app/content";
import {
	selectAvailableActions,
	selectTownView,
	type EngineAction,
	type TownShopSlotView,
} from "@app/engine";
import type { RunView } from "@app/shared";
import { useState } from "react";
import { EquipmentReplacementModal } from "../../../components/EquipmentReplacementModal";
import { GameNavigation } from "../../../components/GameNavigation";
import { GameLayout } from "../../../components/GameLayout";
import { GameMainPanel, GamePanelContainer } from "../../../components/GameMainPanel";
import { HeroSidebar } from "../../hero/components/HeroSidebar";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useSidebarStore } from "../../../stores/sidebarStore";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { TownActionBar } from "./TownActionBar";
import { TownShopGrid } from "./TownShopGrid";
import { useHowToPlayModalStore } from "../../howToPlay";
import { TownGoldBalance } from "./TownGoldBalance";

type TownViewProps = {
	run: RunView;
};

export function TownView({ run }: TownViewProps) {
	const isSidebarOpen = useSidebarStore((state) => state.isOpen);
	const openSidebar = useSidebarStore((state) => state.open);
	const closeSidebar = useSidebarStore((state) => state.close);
	const [replacementSlot, setReplacementSlot] = useState<TownShopSlotView | null>(null);
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);
	const openHowToPlay = useHowToPlayModalStore((state) => state.open);
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

		const automaticDestination = slot.equipmentPlacement.automaticDestination;

		if (!automaticDestination) {
			setReplacementSlot(slot);
			return;
		}

		submitAction(
			{
				type: "BUY_ITEM",
				shopSlotId: slot.id,
				equipmentSlot: automaticDestination.equipmentSlot,
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

	function handleLockChange(slot: TownShopSlotView, locked: boolean) {
		if (slot.purchased || applyRunAction.isPending) {
			return;
		}

		submitAction(
			{
				type: "SET_SHOP_LOCK",
				shopSlotId: slot.id,
				locked,
			},
			"Unable to update that shop lock. Please try again.",
		);
	}

	function handleBuyHealingPotion() {
		submitAction(
			{
				type: "BUY_CONSUMABLE",
				consumableType: "healingPotion",
			},
			"Unable to buy a healing potion. Please try again.",
		);
	}

	function handleEnterCombat() {
		submitAction(
			{
				type: "ENTER_COMBAT",
			},
			"Unable to enter the battle. Please try again.",
		);
	}

	function handleSwapWeapons() {
		submitAction(
			{
				type: "SWAP_HAND_WEAPONS",
			},
			"Unable to swap weapons. Please try again.",
		);
	}

	return (
		<GameLayout>
			<HeroSidebar
				run={run}
				open={isSidebarOpen}
				canSwapWeapons={availableActionTypes.has("SWAP_HAND_WEAPONS")}
				isPending={applyRunAction.isPending}
				onClose={closeSidebar}
				onSwapWeapons={handleSwapWeapons}
			/>

			<GameMainPanel>
				<header className="shrink-0">
					<GamePanelContainer className="py-3 md:py-4">
						<GameNavigation
							label="Town navigation"
							isSidebarOpen={isSidebarOpen}
							onOpenSidebar={openSidebar}
							onHowToPlay={openHowToPlay}
						>
							<TownGoldBalance gold={townView.gold} />
						</GameNavigation>
					</GamePanelContainer>
				</header>
				<div className="min-h-0 flex-1 overflow-y-auto">
					<GamePanelContainer className="flex h-full flex-col py-3 md:py-4 md:pt-0">
						<div className="flex-1">
							<TownShopGrid
								shopSlots={townView.shopSlots}
								isPending={applyRunAction.isPending}
								onBuy={handleBuy}
								onLockChange={handleLockChange}
							/>
						</div>
						<div className="sticky bottom-0 z-20 shrink-0 py-3">
							<TownActionBar
								isPending={applyRunAction.isPending}
								canAffordRest={townView.canAffordRest}
								canRest={
									availableActionTypes.has("REST_AT_TOWN") &&
									townView.canAffordRest
								}
								canAffordReroll={townView.canAffordReroll}
								canReroll={
									availableActionTypes.has("REROLL_SHOP") &&
									townView.canAffordReroll
								}
								canAffordHealingPotion={townView.canAffordHealingPotion}
								canBuyHealingPotion={
									availableActionTypes.has("BUY_CONSUMABLE") &&
									townView.canBuyHealingPotion
								}
								canEnterCombat={availableActionTypes.has("ENTER_COMBAT")}
								restCost={townView.restCost}
								rerollCost={townView.rerollCost}
								healingPotions={townView.healingPotions}
								maxHealingPotions={townView.maxHealingPotions}
								healingPotionCost={townView.healingPotionCost}
								onRest={handleRest}
								onReroll={handleReroll}
								onBuyHealingPotion={handleBuyHealingPotion}
								onEnterCombat={handleEnterCombat}
							/>
						</div>
					</GamePanelContainer>
				</div>
			</GameMainPanel>

			{replacementSlot && (
				<EquipmentReplacementModal
					item={replacementSlot.item}
					destinations={replacementSlot.equipmentPlacement.destinations}
					isPending={applyRunAction.isPending}
					onCancel={() => setReplacementSlot(null)}
					onConfirm={handleConfirmReplacement}
				/>
			)}
		</GameLayout>
	);
}
