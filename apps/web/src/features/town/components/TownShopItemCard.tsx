import { ITEMS_BY_ID } from "@app/content";
import type { TownShopDestinationView, TownShopSlotView } from "@app/engine";
import clsx from "clsx";
import { Card } from "../../../components/Card";
import { Tooltip } from "../../../components/Tooltip";
import {
	getItemRarityTextClassName,
	ItemTooltipContent,
} from "../../../components/tooltips/ItemTooltipContent";
import {
	armourSlotLabels,
	damageTypeLabels,
	equipmentSlotLabels,
	itemRarityLabels,
	weaponTypeLabels,
} from "../../../game/displayLabels";
import { formatItemModifier, getModifierTextClassName } from "../../../game/effectDisplay";
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
	const slotLabel = getDestinationLabel(slot);

	return (
		<Card
			className={clsx(
				"grid grid-cols-[3.5rem_minmax(0,1fr)_3.5rem] gap-3 p-3 transition-opacity md:grid-cols-[4rem_minmax(0,1fr)_4rem]",
				slot.purchased && "opacity-60",
			)}
		>
			<Tooltip
				content={
					primaryDestination ? (
						<ItemTooltipContent item={item} slot={primaryDestination.equipmentSlot} />
					) : null
				}
				className="h-14 w-14 md:h-16 md:w-16"
				contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
			>
				<span className="block h-14 w-14 overflow-hidden border border-border bg-bg-base md:h-16 md:w-16">
					<img
						src={item.icon}
						alt=""
						loading="lazy"
						className="h-full w-full object-cover"
						aria-hidden
					/>
				</span>
			</Tooltip>

			<div className="grid min-w-0 content-start gap-1">
				<div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
					<Tooltip
						content={
							primaryDestination ? (
								<ItemTooltipContent
									item={item}
									slot={primaryDestination.equipmentSlot}
								/>
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
					<span className="text-text-label">{slot.price}g</span>
				</div>

				<div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-text-label">
					<BracketBadge>{slotLabel}</BracketBadge>
					<span className="md:hidden">{getMobileItemSummary(slot)}</span>
					{slot.purchased ? (
						<span className="text-success">Purchased</span>
					) : !slot.canAfford ? (
						<span className="text-error">Need gold</span>
					) : null}
				</div>

				<div className="hidden gap-1 md:grid">
					<p className="text-text">{getDesktopItemSummary(slot)}</p>
					{primaryDestination && <ReplacementDetail destination={primaryDestination} />}
					{slot.requiresEquipmentSlotSelection && (
						<p className="text-text-label">Choose slot when buying</p>
					)}
					<ItemModifierPreview slot={slot} />
				</div>
			</div>

			<button
				type="button"
				className={clsx(
					"relative aspect-square w-14 self-start overflow-hidden bg-bg-elevated transition-colors md:w-16",
					"flex shrink-0 items-center justify-center border border-border",
					disabled
						? "cursor-not-allowed opacity-60"
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
		</Card>
	);
}

function getDestinationLabel(slot: TownShopSlotView) {
	if (slot.destinations.length === 0) {
		return "No slot";
	}

	return slot.destinations
		.map((destination) => equipmentSlotLabels[destination.equipmentSlot])
		.join(" / ");
}

function getMobileItemSummary(slot: TownShopSlotView) {
	if (slot.item.type === "weapon") {
		return weaponTypeLabels[slot.item.weaponType];
	}

	return armourSlotLabels[slot.item.slot];
}

function getDesktopItemSummary(slot: TownShopSlotView) {
	const rarity = itemRarityLabels[slot.item.rarity];

	if (slot.item.type === "weapon") {
		return `${rarity} ${weaponTypeLabels[slot.item.weaponType]} - ${slot.item.damage.dice} ${damageTypeLabels[slot.item.damage.type]}`;
	}

	return `${rarity} ${armourSlotLabels[slot.item.slot]}`;
}

function ReplacementDetail({ destination }: { destination: TownShopDestinationView }) {
	if (destination.replacedItems.length === 0) {
		return (
			<p className="text-text-label">
				Empty {equipmentSlotLabels[destination.equipmentSlot]}
			</p>
		);
	}

	return (
		<p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-text-label">
			<span>Replaces</span>
			<ReplacedItemsInline
				replacedItems={destination.replacedItems}
				fallbackSlot={destination.equipmentSlot}
			/>
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

function ItemModifierPreview({ slot }: { slot: TownShopSlotView }) {
	const previewModifiers = slot.item.modifiers.slice(0, 2);

	if (previewModifiers.length === 0) {
		return null;
	}

	return (
		<ul className="grid gap-1">
			{previewModifiers.map((modifier, index) => (
				<li
					key={`${modifier.type}-${index}`}
					className={clsx("break-words", getModifierTextClassName(modifier))}
				>
					{formatItemModifier(modifier)}
				</li>
			))}
		</ul>
	);
}

function BracketBadge({ children }: { children: string }) {
	return (
		<span className="text-primary before:text-text-muted before:content-['['] after:text-text-muted after:content-[']']">
			{children}
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
