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
import { ShopModal } from "./ShopModal";
import { GameNavigation, DefaultGameNavigationActions } from "../../../components/GameNavigation";
import { TownGoldBalance } from "./TownGoldBalance";
import { GameLayout } from "../../../components/GameLayout";
import { GameMainPanel, GamePanelContainer } from "../../../components/GameMainPanel";
import { HeroSidebar } from "../../hero/components/HeroSidebar";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useSidebarStore } from "../../../stores/sidebarStore";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { TownHub } from "./TownHub";
import { TavernModal } from "./TavernModal";
import { AlchemistModal } from "./AlchemistModal";
import { useWorldLog, WorldLogPanel } from "../../worldLog";

type TownViewProps = {
	run: RunView;
};

export function TownView({ run }: TownViewProps) {
	const isSidebarOpen = useSidebarStore((state) => state.isOpen);
	const closeSidebar = useSidebarStore((state) => state.close);
	const [replacementSlot, setReplacementSlot] = useState<TownShopSlotView | null>(null);
	const [hasViewedShop, setHasViewedShop] = useState(false);
	const [service, setService] = useState<"shop" | "tavern" | "alchemist" | null>(null);
	const worldLog = useWorldLog();
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);
	const townView = selectTownView(run.state);
	const availableActions = selectAvailableActions(run.state);
	const availableActionTypes = new Set(availableActions.map((action) => action.type));

	if (!townView) {
		return <p>Town state is unavailable.</p>;
	}

	function handleVisitShop() {
		setHasViewedShop(true);
		setService("shop");
	}

	async function submitAction(
		action: EngineAction,
		fallbackErrorMessage: string,
	): Promise<boolean> {
		if (applyRunAction.isPending) {
			return false;
		}
		try {
			const { result } = await applyRunAction.mutateAsync({
				runId: run.id,
				action,
			});
			if (!result.ok) {
				showError(getEngineErrorMessage(result.error));
				return false;
			}
			return true;
		} catch {
			showError(fallbackErrorMessage);
			return false;
		}
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

	async function handleConfirmReplacement(equipmentSlot: EquipmentSlot) {
		if (!replacementSlot) {
			return;
		}

		const applied = await submitAction(
			{
				type: "BUY_ITEM",
				shopSlotId: replacementSlot.id,
				equipmentSlot,
			},
			"Unable to buy that item. Please try again.",
		);
		if (applied) {
			setReplacementSlot(null);
		}
	}

	async function handleRest() {
		const applied = await submitAction(
			{
				type: "REST_AT_TOWN",
			},
			"Unable to rest. Please try again.",
		);
		if (applied) {
			setService(null);
		}
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

	function handleBuyHealingPotion(quantity: number) {
		submitAction(
			{
				type: "BUY_CONSUMABLE",
				consumableType: "healingPotion",
				quantity,
			},
			"Unable to buy healing potions. Please try again.",
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

	const canRest = availableActionTypes.has("REST_AT_TOWN");
	const canBuyPotion = availableActionTypes.has("BUY_CONSUMABLE");
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
					<GamePanelContainer className="py-3">
						<GameNavigation actions={<DefaultGameNavigationActions />}>
							<TownGoldBalance gold={townView.gold} />
						</GameNavigation>
					</GamePanelContainer>
				</header>
				<div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
					<GamePanelContainer className="flex flex-1 flex-col py-3">
						<TownHub
							town={townView}
							isPending={applyRunAction.isPending}
							canEnterCombat={availableActionTypes.has("ENTER_COMBAT")}
							hasViewedShop={hasViewedShop}
							onVisitShop={handleVisitShop}
							onVisitTavern={() => setService("tavern")}
							onVisitAlchemist={() => setService("alchemist")}
							onContinue={handleEnterCombat}
						/>
					</GamePanelContainer>
				</div>
				<div className="box-content flex h-36 shrink-0 flex-col border-t-2 border-border-secondary bg-bg-base py-3">
					<GamePanelContainer className="flex min-h-0 flex-1 leading-6">
						<WorldLogPanel {...worldLog} />
					</GamePanelContainer>
				</div>
			</GameMainPanel>
			{service === "shop" && (
				<ShopModal
					town={townView}
					isPending={applyRunAction.isPending}
					canReroll={availableActionTypes.has("REROLL_SHOP")}
					onClose={() => setService(null)}
					onReroll={handleReroll}
					onBuy={handleBuy}
					onLockChange={handleLockChange}
				/>
			)}
			{service === "tavern" && (
				<TavernModal
					town={townView}
					isPending={applyRunAction.isPending}
					canRest={canRest}
					onClose={() => setService(null)}
					onRest={handleRest}
				/>
			)}
			{service === "alchemist" && (
				<AlchemistModal
					town={townView}
					isPending={applyRunAction.isPending}
					canBuyPotion={canBuyPotion}
					onClose={() => setService(null)}
					onBuyPotion={handleBuyHealingPotion}
				/>
			)}
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
