import { ITEMS_BY_ID } from "@app/content";
import type { TownShopDestinationView, TownShopSlotView } from "@app/engine";
import clsx from "clsx";
import { Card } from "../../../components/Card";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { formatItemModifier, getModifierTextClassName } from "../../../game/effectDisplay";
import {
	getEquipmentSlotLabel,
	getItemKindLabel,
	getItemRarityTextClassName,
	getPrimaryItemStat,
} from "../../../game/itemDisplay";
import buyIcon from "../../../assets/images/actions/Skill_ABuy.png";

type TownShopItemCardProps = {
	slot: TownShopSlotView;
	isPending: boolean;
	onBuy: () => void;
};

export function TownShopItemCard({ slot, isPending, onBuy }: TownShopItemCardProps) {
	const { item } = slot;
	const primaryDestination = slot.destinations[0];
	const disabled = isPending || slot.purchased || !slot.canAfford;
	const tooltipSlots = slot.destinations.map((destination) => destination.equipmentSlot);
	const slotLabel = getEquipmentSlotLabel(tooltipSlots);
	const primaryStat = getPrimaryItemStat(item);

	return (
		<Card
			className={clsx(
				"grid grid-cols-[3rem_minmax(0,1fr)_3.5rem] gap-3 p-3 transition-colors sm:grid-cols-[3.5rem_minmax(0,1fr)_3.75rem] md:grid-cols-[4rem_minmax(0,1fr)_4rem]",
				!disabled && "hover:border-primary",
				slot.purchased && "opacity-60",
			)}
		>
			<Tooltip
				content={
					tooltipSlots.length > 0 ? (
						<ItemTooltipContent item={item} slot={tooltipSlots} />
					) : null
				}
				className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
				contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
			>
				<span className="block h-12 w-12 overflow-hidden border border-border bg-bg-base sm:h-14 sm:w-14 md:h-16 md:w-16">
					<img
						src={item.icon}
						alt=""
						loading="lazy"
						className="h-full w-full object-cover"
						aria-hidden
					/>
				</span>
			</Tooltip>

			<div className="grid min-w-0 content-start gap-2">
				<div className="min-w-0">
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
					<span className="mx-2 text-text-muted">/</span>
					<span className={clsx("whitespace-nowrap", getPriceClassName(slot))}>
						{slot.price}g
					</span>
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
					{primaryDestination && <ReplacementDetail destination={primaryDestination} />}
				</div>

				<div className="hidden md:grid">
					<BonusPreview slot={slot} />
				</div>
			</div>

			<div className="grid content-start justify-items-end">
				<button
					type="button"
					className={clsx(
						"relative aspect-square w-12 overflow-hidden bg-bg-elevated transition-colors md:w-14",
						"flex shrink-0 items-center justify-center border border-border",
						disabled
							? "cursor-not-allowed grayscale"
							: "cursor-pointer hover:bg-border/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
					)}
					disabled={disabled}
					aria-label={getBuyLabel(slot)}
					title={getBuyLabel(slot)}
					onClick={onBuy}
				>
					<img
						src={buyIcon}
						alt=""
						loading="lazy"
						className="h-full w-full scale-110 object-cover"
						aria-hidden
					/>
				</button>
				{slot.purchased && <span className="mt-1 text-right text-success">Purchased</span>}
			</div>
		</Card>
	);
}

function getPriceClassName(slot: TownShopSlotView) {
	if (slot.purchased) {
		return "text-success";
	}

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
		<p className={clsx("min-w-0 grid-cols-[4rem_minmax(0,1fr)] gap-2", className ?? "grid")}>
			<span className="text-text-label">{label}</span>
			<span className={clsx("min-w-0 break-words", valueClassName)}>{value}</span>
		</p>
	);
}

function BonusPreview({ slot }: { slot: TownShopSlotView }) {
	if (slot.item.modifiers.length === 0) {
		return null;
	}

	return (
		<div className="grid min-w-0 gap-1">
			<p className="text-text-label">Bonuses</p>
			<ul className="grid gap-1">
				{slot.item.modifiers.map((modifier, index) => (
					<li
						key={`${modifier.type}-${index}`}
						className={clsx("min-w-0 break-words", getModifierTextClassName(modifier))}
					>
						{formatItemModifier(modifier)}
					</li>
				))}
			</ul>
		</div>
	);
}

function ReplacementDetail({ destination }: { destination: TownShopDestinationView }) {
	if (destination.replacedItems.length === 0) {
		return (
			<p className="grid min-w-0 grid-cols-[4rem_minmax(0,1fr)] gap-2">
				<span className="text-text-label">Current</span>
				<span className="text-text">Empty</span>
			</p>
		);
	}

	return (
		<p className="grid min-w-0 grid-cols-[4rem_minmax(0,1fr)] gap-2">
			<span className="text-text-label">Current</span>
			<span className="min-w-0 break-words text-text">
				<ReplacedItemsInline
					replacedItems={destination.replacedItems}
					fallbackSlot={destination.equipmentSlot}
				/>
			</span>
		</p>
	);
}

type ReplacedItemsInlineProps = {
	replacedItems: TownShopDestinationView["replacedItems"];
	fallbackSlot: TownShopDestinationView["equipmentSlot"];
};

function ReplacedItemsInline({ replacedItems, fallbackSlot }: ReplacedItemsInlineProps) {
	return (
		<>
			{replacedItems.map((replacedItem, index) => (
				<ReplacedItemTooltip
					key={replacedItem.instanceId}
					replacedItem={replacedItem}
					fallbackSlot={fallbackSlot}
					prefix={index > 0 ? ", " : ""}
				/>
			))}
		</>
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

function getBuyLabel(slot: TownShopSlotView) {
	if (slot.purchased) {
		return `${slot.item.name} already purchased`;
	}

	if (!slot.canAfford) {
		return `Not enough gold to buy ${slot.item.name}`;
	}

	return `Buy ${slot.item.name} for ${slot.price} gold`;
}
