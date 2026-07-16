import { ITEMS_BY_ID } from "@app/content";
import type { TownShopDestinationView, TownShopSlotView } from "@app/engine";
import clsx from "clsx";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { attributeLabels } from "../../../game/displayLabels";
import { formatItemModifier, getModifierTextClassName } from "../../../game/effectDisplay";
import {
	getEquipmentSlotLabel,
	getItemKindLabel,
	getItemRarityTextClassName,
	getPrimaryItemStat,
} from "../../../game/itemDisplay";

type TownShopItemCardProps = {
	slot: TownShopSlotView;
	isPending: boolean;
	onBuy: () => void;
};

export function TownShopItemCard({ slot, isPending, onBuy }: TownShopItemCardProps) {
	const { item } = slot;
	const isPurchased = slot.purchased;
	const disabled = isPending || isPurchased || !slot.canAfford;
	const tooltipSlots = slot.destinations.map((destination) => destination.equipmentSlot);
	const slotLabel = getEquipmentSlotLabel(tooltipSlots);
	const primaryStat = getPrimaryItemStat(item);

	return (
		<article
			className={clsx(
				"relative grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-3 border-2 border-border-secondary bg-bg-panel p-3 sm:grid-cols-[3.5rem_minmax(0,1fr)] md:grid-cols-[4rem_minmax(0,1fr)]",
				isPurchased && "border-dashed bg-bg-base",
			)}
		>
			<div className={clsx("contents", isPurchased && "invisible")} aria-hidden={isPurchased}>
				<Tooltip
					content={
						tooltipSlots.length > 0 ? (
							<ItemTooltipContent item={item} slot={tooltipSlots} />
						) : null
					}
					className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
					contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
				>
					<span className="block h-12 w-12 overflow-hidden border-2 border-bg-elevated bg-bg-base sm:h-14 sm:w-14 md:h-16 md:w-16">
						<img
							key={item.id}
							src={item.icon}
							alt=""
							loading="eager"
							decoding="async"
							className="h-full w-full object-cover"
							aria-hidden
						/>
					</span>
				</Tooltip>

				<div className="grid min-w-0 content-start gap-2">
					<div className="grid min-w-0 grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_3.75rem] md:grid-cols-[minmax(0,1fr)_4rem]">
						<div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
							<Tooltip
								content={
									tooltipSlots.length > 0 ? (
										<ItemTooltipContent item={item} slot={tooltipSlots} />
									) : null
								}
								className={clsx(
									"min-w-0 max-w-full break-words underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
									getItemRarityTextClassName(item.rarity),
								)}
								contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
							>
								{item.name}
							</Tooltip>
							<span className="whitespace-nowrap">
								<span className="mr-2 text-text-muted">/</span>
								<span className={getPriceClassName(slot)}>{slot.price}g</span>
							</span>
						</div>

						<Button
							type="button"
							variant="primary"
							className="justify-self-end border-border-secondary px-2"
							disabled={disabled}
							aria-label={getBuyLabel(slot)}
							title={getBuyLabel(slot)}
							onClick={onBuy}
						>
							Buy
						</Button>
					</div>

					<div className="grid min-w-0 gap-1">
						<DetailLine
							label="Type"
							value={getItemKindLabel(item)}
							className="hidden md:grid"
						/>
						<DetailLine label="Slot" value={slotLabel} className="hidden md:grid" />
						{primaryStat && (
							<DetailLine
								label={primaryStat.label}
								value={primaryStat.value}
								valueClassName="text-text-bright"
								className="hidden md:grid"
							/>
						)}
						{item.type === "weapon" && (
							<DetailLine
								label="Attribute"
								value={attributeLabels[item.damage.attribute]}
								className="hidden md:grid"
							/>
						)}
						<ReplacementDetails destinations={slot.destinations} />
					</div>

					<div className="hidden md:block">
						<ModifierPreview slot={slot} />
					</div>
				</div>
			</div>

			{isPurchased && (
				<div className="pointer-events-none absolute inset-0 grid place-items-center">
					<Badge label="SOLD" className="text-text-muted" />
				</div>
			)}
		</article>
	);
}

function getPriceClassName(slot: TownShopSlotView) {
	if (!slot.canAfford) {
		return "text-error";
	}

	return "text-primary";
}

function DetailLine({
	label,
	value,
	valueClassName = "text-text",
	className,
}: {
	label: string;
	value: string;
	valueClassName?: string;
	className?: string;
}) {
	return (
		<p className={clsx("min-w-0 grid-cols-[5rem_minmax(0,1fr)] gap-2", className ?? "grid")}>
			<span className="whitespace-nowrap text-text-label">{label}</span>
			<span className={clsx("min-w-0 break-words", valueClassName)}>{value}</span>
		</p>
	);
}

function ModifierPreview({ slot }: { slot: TownShopSlotView }) {
	if (slot.item.modifiers.length === 0) {
		return null;
	}

	return (
		<ul className="grid min-w-0 gap-1">
			{slot.item.modifiers.map((modifier, index) => (
				<li
					key={`${modifier.type}-${index}`}
					className={clsx("min-w-0 break-words", getModifierTextClassName(modifier))}
				>
					{formatItemModifier(modifier)}
				</li>
			))}
		</ul>
	);
}

function ReplacementDetails({
	destinations,
}: {
	destinations: readonly TownShopDestinationView[];
}) {
	if (destinations.length === 0) {
		return null;
	}

	return (
		<p className="grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] gap-2">
			<span className="text-text-label">Current</span>
			<span className="min-w-0 break-words text-text">
				<CombinedDestinationItems destinations={destinations} />
			</span>
		</p>
	);
}

function CombinedDestinationItems({
	destinations,
}: {
	destinations: readonly TownShopDestinationView[];
}) {
	const replacedItems = destinations.flatMap((destination) =>
		destination.replacedItems.map((replacedItem) => ({
			replacedItem,
			fallbackSlot: destination.equipmentSlot,
		})),
	);
	const uniqueReplacedItems = replacedItems.filter(
		(entry, index) =>
			replacedItems.findIndex(
				(candidate) => candidate.replacedItem.instanceId === entry.replacedItem.instanceId,
			) === index,
	);
	const includesEmpty = destinations.some(
		(destination) => destination.replacedItems.length === 0,
	);
	const values = [
		...uniqueReplacedItems.map((entry) => ({ type: "item" as const, ...entry })),
		...(includesEmpty ? [{ type: "empty" as const }] : []),
	];

	return (
		<>
			{values.map((value, index) => (
				<span key={value.type === "item" ? value.replacedItem.instanceId : "empty"}>
					{index > 0 && ", "}
					{value.type === "item" ? (
						<ReplacedItemTooltip
							replacedItem={value.replacedItem}
							fallbackSlot={value.fallbackSlot}
						/>
					) : (
						"Empty"
					)}
				</span>
			))}
		</>
	);
}

type ReplacedItemTooltipProps = {
	replacedItem: TownShopDestinationView["replacedItems"][number];
	fallbackSlot: TownShopDestinationView["equipmentSlot"];
};

function ReplacedItemTooltip({ replacedItem, fallbackSlot }: ReplacedItemTooltipProps) {
	const item = ITEMS_BY_ID[replacedItem.itemId];

	if (!item) {
		return <span>Unknown item</span>;
	}

	return (
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
	);
}

function getBuyLabel(slot: TownShopSlotView) {
	if (slot.purchased) {
		return `${slot.item.name} already purchased`;
	}

	if (!slot.canAfford) {
		return `Not enough gold to buy ${slot.item.name}`;
	}

	return `Buy ${slot.item.name} for ${slot.price} gold`;
}
