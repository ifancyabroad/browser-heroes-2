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
import { Button } from "../../../components/Button";
import { TownShopGrid } from "./TownShopGrid";
import { GameNavigation } from "../../../components/GameNavigation";
import { TownGoldBalance } from "./TownGoldBalance";
import { GameLayout } from "../../../components/GameLayout";
import { GameMainPanel, GamePanelContainer } from "../../../components/GameMainPanel";
import { HeroSummary } from "../../hero";
import { formatTitle } from "../../../presentation/effects";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { TownHub } from "./TownHub";
import { TavernModal } from "./TavernModal";
import { AlchemistModal } from "./AlchemistModal";
import { useWorldLog, WorldLogPanel } from "../../worldLog";

type TownViewProps = {
	run: RunView;
};

export function TownView({ run }: TownViewProps) {
	const [replacementSlot, setReplacementSlot] = useState<TownShopSlotView | null>(null);
	const [service, setService] = useState<"tavern" | "alchemist" | null>(null);
	const worldLog = useWorldLog();
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);
	const townView = selectTownView(run.state);
	const availableActions = selectAvailableActions(run.state);
	const availableActionTypes = new Set(availableActions.map((action) => action.type));

	if (!townView) {
		return <p>Town state is unavailable.</p>;
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

	const canRest = availableActionTypes.has("REST_AT_TOWN");
	const canBuyPotion = availableActionTypes.has("BUY_CONSUMABLE");
	return (
		<GameLayout>
			<GameMainPanel>
				<header className="shrink-0">
					<GamePanelContainer className="py-3">
						<GameNavigation>
							<TownGoldBalance gold={townView.gold} />
						</GameNavigation>
					</GamePanelContainer>
				</header>
				<div className="min-h-0 flex-1 overflow-y-auto">
					<GamePanelContainer className="flex min-h-full flex-col">
						<div className="grid flex-1 items-start gap-6 py-3 md:grid-cols-[20rem_minmax(0,1fr)]">
							<div className="grid gap-4 lg:sticky lg:top-3">
								<HeroSummary run={run} />
								<dl className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Run">
									{[
										{ label: "Zone", value: formatTitle(run.state.zone) },
										{ label: "Battle", value: run.state.battleNumber },
										{ label: "Day", value: run.state.day },
									].map(({ label, value }) => (
										<div key={label} className="flex gap-2">
											<dt className="text-text-label">{label}</dt>
											<dd className="text-text-bright">{value}</dd>
										</div>
									))}
								</dl>
								<TownHub
									town={townView}
									isPending={applyRunAction.isPending}
									canEnterCombat={availableActionTypes.has("ENTER_COMBAT")}
									onVisitTavern={() => setService("tavern")}
									onVisitAlchemist={() => setService("alchemist")}
									onContinue={handleEnterCombat}
								/>
							</div>
							<section aria-label="Shop" className="min-w-0">
								<TownShopGrid
									shopSlots={townView.shopSlots}
									isPending={applyRunAction.isPending}
									onBuy={handleBuy}
									onLockChange={handleLockChange}
								/>
								<div className="pointer-events-none sticky bottom-0 z-20 flex justify-end py-3">
									<Button
										type="button"
										variant="primary"
										className="pointer-events-auto tabular-nums"
										disabled={
											applyRunAction.isPending ||
											!availableActionTypes.has("REROLL_SHOP")
										}
										onClick={handleReroll}
									>
										Reroll {townView.rerollCost}g
									</Button>
								</div>
							</section>
						</div>
						<WorldLogPanel {...worldLog} />
					</GamePanelContainer>
				</div>
			</GameMainPanel>
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
