import type { EquipmentSlot } from "@app/content";
import clsx from "clsx";
import { useState } from "react";
import { RadioGroup } from "radix-ui";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { RadioCard } from "./RadioCard";
import { Tooltip } from "./Tooltip";
import { ItemTooltipContent } from "./tooltips/ItemTooltipContent";
import { getEquipmentSlotLabel, getItemRarityTextClassName } from "../presentation/items";
import {
	selectItemDefinition,
	type EquipmentDestinationView,
	type EquippedItemState,
	type RuntimeItem,
} from "@app/engine";

type EquipmentReplacementModalProps = {
	item: RuntimeItem;
	destinations: readonly EquipmentDestinationView[];
	isPending: boolean;
	onCancel: () => void;
	onConfirm: (equipmentSlot: EquipmentSlot) => void;
};

const itemTooltipTriggerClassName =
	"underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const itemTooltipContentClassName = "w-80 max-w-[calc(100vw-1rem)] sm:w-96";

export function EquipmentReplacementModal({
	item,
	destinations,
	isPending,
	onCancel,
	onConfirm,
}: EquipmentReplacementModalProps) {
	const [selection, setSelection] = useState<EquipmentDestinationView | null>(
		destinations.length === 1 ? destinations[0] : null,
	);
	const canConfirm = !isPending && selection !== null;
	const isReplacementChoice = destinations.length > 1;
	function handleConfirm() {
		if (!canConfirm || !selection) {
			return;
		}

		onConfirm(selection.equipmentSlot);
	}

	return (
		<Modal
			open
			title={isReplacementChoice ? "Choose Replacement" : "Replace Equipment"}
			onClose={onCancel}
			dismissible={!isPending}
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
					{isReplacementChoice ? (
						<>
							Choose which item to replace with <ItemName item={item} />.
						</>
					) : selection ? (
						<>
							Are you sure you wish to replace{" "}
							<ReplacedItemNames destination={selection} /> with{" "}
							<ItemName item={item} />?
						</>
					) : null}
				</p>

				{isReplacementChoice ? (
					<RadioGroup.Root
						value={selection?.equipmentSlot ?? ""}
						onValueChange={(equipmentSlot) => {
							const destination = destinations.find(
								(candidate) => candidate.equipmentSlot === equipmentSlot,
							);
							if (destination) {
								setSelection(destination);
							}
						}}
						disabled={isPending}
						className="grid gap-2"
						aria-label="Equipment slot choices"
					>
						{destinations.map((destination) => (
							<ReplacementChoice
								key={destination.equipmentSlot}
								destination={destination}
								selected={selection?.equipmentSlot === destination.equipmentSlot}
								disabled={isPending}
							/>
						))}
					</RadioGroup.Root>
				) : null}
			</div>
		</Modal>
	);
}

type ReplacementChoiceProps = {
	destination: EquipmentDestinationView;
	selected: boolean;
	disabled: boolean;
};

function ReplacementChoice({ destination, selected, disabled }: ReplacementChoiceProps) {
	return (
		<RadioCard
			value={destination.equipmentSlot}
			selected={selected}
			selectionLabel={`Select ${getEquipmentSlotLabel(destination.equipmentSlot)}`}
			disabled={disabled}
			className="gap-2"
		>
			<span className="text-text-bright">
				{getEquipmentSlotLabel(destination.equipmentSlot)}
			</span>
			<span className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-1">
				<span className="text-text-label">Equipped</span>
				<span className="min-w-0 break-words text-text">
					<ReplacedItemNames destination={destination} />
				</span>
			</span>
		</RadioCard>
	);
}

function ReplacedItemNames({ destination }: { destination: EquipmentDestinationView }) {
	return destination.replacedItems.map((replacedItem, index) => (
		<ReplacedItemTooltip
			key={replacedItem.instanceId}
			replacedItem={replacedItem}
			prefix={index > 0 ? ", " : ""}
		/>
	));
}

type ReplacedItemTooltipProps = {
	replacedItem: EquippedItemState;
	prefix: string;
};

function ReplacedItemTooltip({ replacedItem, prefix }: ReplacedItemTooltipProps) {
	const item = selectItemDefinition(replacedItem);

	if (!item) {
		return <span>{prefix}Unknown item</span>;
	}

	return (
		<span>
			{prefix}
			<ItemName item={item} />
		</span>
	);
}

function ItemName({ item }: { item: RuntimeItem }) {
	return (
		<Tooltip
			content={<ItemTooltipContent item={item} />}
			className={clsx(itemTooltipTriggerClassName, getItemRarityTextClassName(item.rarity))}
			contentClassName={itemTooltipContentClassName}
		>
			{item.name}
		</Tooltip>
	);
}
