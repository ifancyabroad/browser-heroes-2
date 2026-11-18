import { equipmentSlots } from "@app/content";
import { selectAvailableActions, selectHeroView, selectItemDefinition } from "@app/engine";
import type { RunView } from "@app/shared";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { getEquipmentSlotLabel, getItemRarityTextClassName } from "../../../presentation/items";
import { useGameModalStore } from "../../../stores/gameModalStore";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";

export function HeroEquipmentModal({ run }: { run: RunView }) {
	const isOpen = useGameModalStore((state) => state.modal === "equipment");
	const close = useGameModalStore((state) => state.close);
	const showError = useErrorModalStore((state) => state.showError);
	const applyRunAction = useApplyRunAction();
	if (!isOpen) {
		return null;
	}
	const { equipment } = selectHeroView(run.state.hero);
	const canSwap = selectAvailableActions(run.state).some(
		({ type }) => type === "SWAP_HAND_WEAPONS",
	);

	function swapWeapons() {
		if (!canSwap || applyRunAction.isPending) {
			return;
		}
		applyRunAction.mutate(
			{ runId: run.id, action: { type: "SWAP_HAND_WEAPONS" } },
			{
				onSuccess: ({ result }) => {
					if (!result.ok) {
						showError(getEngineErrorMessage(result.error));
					}
				},
				onError: () => showError("Unable to swap weapons. Please try again."),
			},
		);
	}
	return (
		<Modal
			open
			title="Equipment"
			size="sm"
			onClose={close}
			footer={
				<Button type="button" onClick={close}>
					Close
				</Button>
			}
		>
			<div className="grid gap-2">
				{equipmentSlots.map((slot) => {
					const equippedItem = equipment[slot];
					const item = equippedItem ? selectItemDefinition(equippedItem) : null;
					return (
						<div
							key={slot}
							className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-3"
						>
							<p className="text-text-label">{getEquipmentSlotLabel(slot)}</p>
							{item ? (
								<Tooltip
									content={<ItemTooltipContent item={item} />}
									placement="right"
									className={clsx(
										"min-w-0 justify-self-end text-right underline decoration-border underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
										getItemRarityTextClassName(item.rarity),
									)}
									contentClassName="w-80 sm:w-96"
								>
									{item.name}
								</Tooltip>
							) : (
								<p className="min-w-0 text-right text-text-muted">Empty</p>
							)}
						</div>
					);
				})}
				<Button
					type="button"
					disabled={!canSwap || applyRunAction.isPending}
					onClick={swapWeapons}
				>
					Swap Weapons
				</Button>
			</div>
		</Modal>
	);
}
