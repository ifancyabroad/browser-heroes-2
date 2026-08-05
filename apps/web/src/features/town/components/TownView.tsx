import type { EquipmentSlot } from "@app/content";
import {
	selectAvailableActions,
	selectTownView,
	type EngineAction,
	type TownShopSlotView,
} from "@app/engine";
import type { RunView } from "@app/shared";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "../../../components/Button";
import { EquipmentSlotModal } from "../../../components/EquipmentSlotModal";
import { GameLayout } from "../../../components/GameLayout";
import { GameMainPanel } from "../../../components/GameMainPanel";
import { ButtonLink } from "../../../components/Button";
import { HeroSidebar } from "./HeroSidebar";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { TownActionBar } from "./TownActionBar";
import { TownShopGrid } from "./TownShopGrid";
import { useHowToPlayModalStore } from "../../howToPlay";
import { ArrowLeft } from "pixelarticons/react/ArrowLeft";

type TownViewProps = {
	run: RunView;
};

export function TownView({ run }: TownViewProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
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

	function handleSwapWeapons() {
		submitAction(
			{
				type: "SWAP_HAND_WEAPONS",
			},
			"Unable to swap weapons. Please try again.",
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
			<HeroSidebar
				run={run}
				battleNumber={townView.battleNumber}
				day={townView.day}
				gold={townView.gold}
				zone={townView.zone}
				open={sidebarOpen}
				canSwapWeapons={availableActionTypes.has("SWAP_HAND_WEAPONS")}
				isPending={applyRunAction.isPending}
				onClose={handleCloseSidebar}
				onSwapWeapons={handleSwapWeapons}
			/>

			<GameMainPanel
				mobileHeader={
					<div className="flex items-center justify-between gap-2">
						<Button variant="primary" type="button" onClick={handleOpenSidebar}>
							Hero
						</Button>

						<div className="flex items-center gap-2">
							<Button type="button" onClick={openHowToPlay}>
								How to play
							</Button>

							<ButtonLink to="/">Home</ButtonLink>
						</div>
					</div>
				}
				actions={
					<TownActionBar
						isPending={applyRunAction.isPending}
						gold={townView.gold}
						canAffordRest={townView.canAffordRest}
						canRest={availableActionTypes.has("REST_AT_TOWN") && townView.canAffordRest}
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
						healingPotions={townView.healingPotions}
						maxHealingPotions={townView.maxHealingPotions}
						healingPotionCost={townView.healingPotionCost}
						onRest={handleRest}
						onReroll={handleReroll}
						onBuyHealingPotion={handleBuyHealingPotion}
						onEnterCombat={handleEnterCombat}
					/>
				}
			>
				<nav
					aria-label="Town navigation"
					className="mb-4 hidden items-center justify-between md:flex"
				>
					<RouterLink
						to="/"
						className="inline-flex items-center text-text-bright hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					>
						<ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4" />
						BACK
					</RouterLink>

					<button
						type="button"
						className="cursor-pointer text-text-bright hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						onClick={openHowToPlay}
					>
						HOW TO PLAY
					</button>
				</nav>

				<TownShopGrid
					shopSlots={townView.shopSlots}
					isPending={applyRunAction.isPending}
					onBuy={handleBuy}
					onLockChange={handleLockChange}
				/>
			</GameMainPanel>

			{replacementSlot && (
				<EquipmentSlotModal
					item={replacementSlot.item}
					destinations={replacementSlot.destinations}
					isPending={applyRunAction.isPending}
					onCancel={() => setReplacementSlot(null)}
					onConfirm={handleConfirmReplacement}
				/>
			)}
		</GameLayout>
	);
}
