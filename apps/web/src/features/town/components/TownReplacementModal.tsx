import type { EquipmentSlot } from "@app/content";
import type { TownShopDestinationView, TownShopSlotView } from "@app/engine";
import { ITEMS_BY_ID } from "@app/content";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { getEquipmentSlotLabel, getItemRarityTextClassName } from "../../../game/itemDisplay";
import { formatReplacementItems } from "../../rewards/components/RewardOptionCard";

type TownReplacementModalProps = {
	slot: TownShopSlotView;
	isPending: boolean;
	onBack: () => void;
	onConfirm: (equipmentSlot: EquipmentSlot) => void;
};

export function TownReplacementModal({
	slot,
	isPending,
	onBack,
	onConfirm,
}: TownReplacementModalProps) {
	const [selection, setSelection] = useState<TownShopDestinationView | null>(null);
	const canConfirm = !isPending && selection !== null;

	function handleConfirm() {
		if (!canConfirm || !selection) {
			return;
		}

		onConfirm(selection.equipmentSlot);
	}

	return (
		<Modal
			open
			title="Choose Slot"
			onClose={onBack}
			closeOnBackdropClick={!isPending}
			className="max-w-2xl"
			footer={
				<>
					<Button
						type="button"
						className="text-text-label disabled:cursor-not-allowed disabled:text-text-muted disabled:opacity-60"
						disabled={isPending}
						onClick={onBack}
					>
						Back
					</Button>
					<Button
						type="button"
						className="text-primary disabled:cursor-not-allowed disabled:text-text-muted disabled:opacity-60"
						disabled={!canConfirm}
						onClick={handleConfirm}
					>
						Confirm
					</Button>
				</>
			}
		>
			<div className="grid gap-4 text-base">
				<p>
					Choose where to equip{" "}
					<Tooltip
						content={
							<ItemTooltipContent
								item={slot.item}
								slot={
									selection?.equipmentSlot ?? slot.destinations[0]?.equipmentSlot
								}
							/>
						}
						className={clsx(
							"underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
							getItemRarityTextClassName(slot.item.rarity),
						)}
						contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
					>
						{slot.item.name}
					</Tooltip>
					.
				</p>

				<div className="grid gap-2" role="radiogroup" aria-label="Shop slot choices">
					{slot.destinations.map((destination) => (
						<ReplacementChoice
							key={destination.equipmentSlot}
							destination={destination}
							selected={selection?.equipmentSlot === destination.equipmentSlot}
							disabled={isPending}
							onSelect={() => setSelection(destination)}
						/>
					))}
				</div>
			</div>
		</Modal>
	);
}

type ReplacementChoiceProps = {
	destination: TownShopDestinationView;
	selected: boolean;
	disabled: boolean;
	onSelect: () => void;
};

function ReplacementChoice({ destination, selected, disabled, onSelect }: ReplacementChoiceProps) {
	return (
		<button
			type="button"
			role="radio"
			aria-checked={selected}
			disabled={disabled}
			onClick={onSelect}
			className={clsx(
				"grid gap-2 border-2 bg-bg-elevated p-3 text-left text-base transition-colors",
				selected
					? "border-primary"
					: "border-border hover:border-primary focus-visible:border-primary",
				disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
			)}
		>
			<span className="text-text-bright">
				{getEquipmentSlotLabel(destination.equipmentSlot)}
			</span>
			{destination.replacedItems.length === 0 ? (
				<span className="text-text-label">Empty slot</span>
			) : (
				<span className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-text-label">
					<span>Replaces</span>
					{destination.replacedItems.map((replacedItem, index) => (
						<ReplacedItemTooltip
							key={replacedItem.instanceId}
							replacedItem={replacedItem}
							fallbackSlot={destination.equipmentSlot}
							prefix={index > 0 ? ", " : ""}
						/>
					))}
					<span className="sr-only">
						{formatReplacementItems(destination.replacedItems)}
					</span>
				</span>
			)}
		</button>
	);
}

type ReplacedItemTooltipProps = {
	replacedItem: TownShopDestinationView["replacedItems"][number];
	fallbackSlot: TownShopDestinationView["equipmentSlot"];
	prefix: string;
};

function ReplacedItemTooltip({ replacedItem, fallbackSlot, prefix }: ReplacedItemTooltipProps) {
	const item = ITEMS_BY_ID[replacedItem.itemId];

	if (!item) {
		return <span>{prefix}Unknown item</span>;
	}

	return (
		<span>
			{prefix}
			<Tooltip
				content={<ItemTooltipContent item={item} slot={fallbackSlot} />}
				className={clsx(
					"underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
					getItemRarityTextClassName(item.rarity),
				)}
				contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
			>
				{item.name}
			</Tooltip>
		</span>
	);
}
