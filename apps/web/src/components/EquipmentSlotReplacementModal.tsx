import type { EquipmentSlot, Item, ItemId } from "@app/content";
import { ITEMS_BY_ID } from "@app/content";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { getSelectionClassName } from "./ControlStyles";
import { Tooltip } from "./Tooltip";
import { ItemTooltipContent } from "./tooltips/ItemTooltipContent";
import { getEquipmentSlotLabel, getItemRarityTextClassName } from "../game/itemDisplay";

type ReplacementItem = {
	instanceId: string;
	itemId: ItemId;
};

type EquipmentSlotReplacementDestination = {
	equipmentSlot: EquipmentSlot;
	replacedItems: readonly ReplacementItem[];
};

type EquipmentSlotReplacementModalProps = {
	item: Item;
	destinations: readonly EquipmentSlotReplacementDestination[];
	isPending: boolean;
	onCancel: () => void;
	onConfirm: (equipmentSlot: EquipmentSlot) => void;
};

const itemTooltipTriggerClassName =
	"underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const itemTooltipContentClassName = "w-80 max-w-[calc(100vw-1rem)] sm:w-96";

export function EquipmentSlotReplacementModal({
	item,
	destinations,
	isPending,
	onCancel,
	onConfirm,
}: EquipmentSlotReplacementModalProps) {
	const [selection, setSelection] = useState<EquipmentSlotReplacementDestination | null>(null);
	const canConfirm = !isPending && selection !== null;
	const tooltipSlot =
		selection?.equipmentSlot ?? destinations.map((destination) => destination.equipmentSlot);

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
			onClose={onCancel}
			dismissible={!isPending}
			className="max-w-2xl"
			footer={
				<>
					<Button type="button" disabled={isPending} onClick={onCancel}>
						Cancel
					</Button>
					<Button
						type="button"
						variant="primary"
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
						content={<ItemTooltipContent item={item} slot={tooltipSlot} />}
						className={clsx(
							itemTooltipTriggerClassName,
							getItemRarityTextClassName(item.rarity),
						)}
						contentClassName={itemTooltipContentClassName}
					>
						{item.name}
					</Tooltip>
					.
				</p>

				<div className="grid gap-2" role="radiogroup" aria-label="Equipment slot choices">
					{destinations.map((destination) => (
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
	destination: EquipmentSlotReplacementDestination;
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
				"grid gap-2 border-2 bg-bg-panel p-3 text-left text-base",
				getSelectionClassName({ selected, disabled }),
			)}
		>
			<span className="text-text-bright">
				{getEquipmentSlotLabel(destination.equipmentSlot)}
			</span>
			{destination.replacedItems.length === 0 ? (
				<span className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-1">
					<span className="text-text-label">Currently Equipped:</span>
					<span className="text-text">Empty</span>
				</span>
			) : (
				<span className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-1">
					<span className="text-text-label">Currently Equipped:</span>
					<span className="min-w-0 break-words text-text">
						{destination.replacedItems.map((replacedItem, index) => (
							<ReplacedItemTooltip
								key={replacedItem.instanceId}
								replacedItem={replacedItem}
								fallbackSlot={destination.equipmentSlot}
								prefix={index > 0 ? ", " : ""}
							/>
						))}
					</span>
				</span>
			)}
		</button>
	);
}

type ReplacedItemTooltipProps = {
	replacedItem: ReplacementItem;
	fallbackSlot: EquipmentSlot;
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
					itemTooltipTriggerClassName,
					getItemRarityTextClassName(item.rarity),
				)}
				contentClassName={itemTooltipContentClassName}
			>
				{item.name}
			</Tooltip>
		</span>
	);
}
