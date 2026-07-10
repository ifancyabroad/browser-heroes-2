import type { EngineAction, RewardChoiceOptionView, RewardItemDestinationView } from "@app/engine";
import { ITEMS_BY_ID } from "@app/content";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { getEquipmentSlotLabel, getItemRarityTextClassName } from "../../../game/itemDisplay";
import { formatReplacementItems } from "./RewardOptionCard";

type RewardSelection = Extract<EngineAction, { type: "SELECT_REWARD" }>["selection"];
type ItemRewardOptionView = Extract<RewardChoiceOptionView, { type: "item" }>;

type RewardReplacementModalProps = {
	option: ItemRewardOptionView;
	isPending: boolean;
	onBack: () => void;
	onConfirm: (selection: RewardSelection) => void;
};

export function RewardReplacementModal({
	option,
	isPending,
	onBack,
	onConfirm,
}: RewardReplacementModalProps) {
	const [selection, setSelection] = useState<RewardItemDestinationView | null>(null);
	const canConfirm = !isPending && selection !== null;

	function handleConfirm() {
		if (!canConfirm || !selection) {
			return;
		}

		onConfirm({
			optionIndex: option.optionIndex,
			equipmentSlot: selection.equipmentSlot,
		});
	}

	return (
		<Modal
			open
			title="Choose Replacement"
			onClose={() => undefined}
			closeOnBackdropClick={false}
			className="max-w-2xl"
			titleClassName="text-text-bright"
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
								item={option.item}
								slot={
									selection?.equipmentSlot ??
									option.destinations[0]?.equipmentSlot
								}
							/>
						}
						className={clsx(
							"underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
							getItemRarityTextClassName(option.item.rarity),
						)}
						contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
					>
						{option.item.name}
					</Tooltip>
					.
				</p>

				<div className="grid gap-2" role="radiogroup" aria-label="Replacement choices">
					{option.destinations.map((preview) => (
						<ReplacementChoice
							key={preview.equipmentSlot}
							preview={preview}
							selected={selection?.equipmentSlot === preview.equipmentSlot}
							disabled={isPending}
							onSelect={() => setSelection(preview)}
						/>
					))}
				</div>
			</div>
		</Modal>
	);
}

type ReplacementChoiceProps = {
	preview: RewardItemDestinationView;
	selected: boolean;
	disabled: boolean;
	onSelect: () => void;
};

function ReplacementChoice({ preview, selected, disabled, onSelect }: ReplacementChoiceProps) {
	return (
		<button
			type="button"
			role="radio"
			aria-checked={selected}
			disabled={disabled}
			onClick={onSelect}
			className={clsx(
				"grid gap-2 border bg-bg-elevated p-3 text-left text-base",
				selected
					? "border-info"
					: "border-transparent hover:border-info focus-visible:border-info",
				disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
			)}
		>
			<span>{getEquipmentSlotLabel(preview.equipmentSlot)}</span>
			{preview.replacedItems.length === 0 ? (
				<span className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-1">
					<span className="text-text-label">Currently Equipped:</span>
					<span className="text-text">Empty</span>
				</span>
			) : (
				<span className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-1">
					<span className="text-text-label">Currently Equipped:</span>
					<span className="min-w-0 break-words text-text">
						{preview.replacedItems.map((replacedItem, index) => (
							<ReplacedItemTooltip
								key={replacedItem.instanceId}
								replacedItem={replacedItem}
								fallbackSlot={preview.equipmentSlot}
								prefix={index > 0 ? ", " : ""}
							/>
						))}
					</span>
					<span className="sr-only">{formatReplacementItems(preview.replacedItems)}</span>
				</span>
			)}
		</button>
	);
}

type ReplacedItemTooltipProps = {
	replacedItem: RewardItemDestinationView["replacedItems"][number];
	fallbackSlot: RewardItemDestinationView["equipmentSlot"];
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
