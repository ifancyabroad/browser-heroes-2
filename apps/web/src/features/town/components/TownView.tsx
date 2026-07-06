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
import { Layout } from "../../../components/Layout";
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
		<Layout>
			<div className="flex min-h-0 flex-1 overflow-hidden bg-bg-base text-base text-text">
				<HeroSidebar run={run} open={sidebarOpen} onClose={handleCloseSidebar} />

				<section className="flex min-w-0 flex-1 flex-col">
					<header className="px-4 py-3 md:hidden">
						<Button className="text-primary" type="button" onClick={handleOpenSidebar}>
							Hero
						</Button>
					</header>

					<div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4">
						<header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
							<div className="grid gap-1">
								<h1 className="text-base text-text-bright">Town Shop</h1>
								<p className="text-text-label">Shop level {townView.shopLevel}</p>
							</div>
							<div className="flex items-baseline gap-2">
								<span className="text-text-label">Gold</span>
								<span className="text-text-bright">{townView.gold}</span>
							</div>
						</header>

						<TownShopGrid
							shopSlots={townView.shopSlots}
							isPending={applyRunAction.isPending}
							onBuy={handleBuy}
						/>

						<div className="mt-auto pt-3">
							<TownActionBar
								isPending={applyRunAction.isPending}
								canRest={
									availableActionTypes.has("REST_AT_TOWN") &&
									townView.canAffordRest &&
									!townView.isFullyHealed
								}
								canReroll={
									availableActionTypes.has("REROLL_SHOP") &&
									townView.canAffordReroll
								}
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
						</div>
					</div>
				</section>

				{replacementSlot && (
					<TownReplacementModal
						slot={replacementSlot}
						isPending={applyRunAction.isPending}
						onBack={() => setReplacementSlot(null)}
						onConfirm={handleConfirmReplacement}
					/>
				)}
			</div>
		</Layout>
	);
}
