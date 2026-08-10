import { type EquipmentDestinationView, type TownShopSlotView } from "@app/engine";
import clsx from "clsx";
import { Badge } from "../../../components/Badge";
import { Button, IconButton } from "../../../components/Button";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { EquipmentReplacementItems } from "../../../components/EquipmentReplacementItems";
import { AttackRiderTooltipList } from "../../../components/tooltips/AttackRiderTooltipList";
import { attributeLabels } from "../../../presentation/labels";
import { formatItemModifier, getModifierTextClassName } from "../../../presentation/effects";
import { LockSharp } from "pixelarticons/react/LockSharp";
import {
	getEquipmentSlotLabel,
	getItemKindLabel,
	getItemRarityTextClassName,
	getPrimaryItemStat,
} from "../../../presentation/items";
import { resolveImageUrl } from "../../../utils/image";

type TownShopItemCardProps = {
	slot: TownShopSlotView;
	isPending: boolean;
	onBuy: () => void;
	onLockChange: (locked: boolean) => void;
};

export function TownShopItemCard({ slot, isPending, onBuy, onLockChange }: TownShopItemCardProps) {
	const { item } = slot;
	const isPurchased = slot.purchased;
	const { destinations } = slot.equipmentPlacement;
	const tooltipSlots = destinations.map((destination) => destination.equipmentSlot);
	const slotLabel = getEquipmentSlotLabel(tooltipSlots);
	const primaryStat = getPrimaryItemStat(item);
	const requiresReplacement = slot.equipmentPlacement.automaticDestination === null;

	return (
		<article className="relative min-w-0">
			<div
				className={clsx(
					"grid min-w-0 grid-cols-[3rem_minmax(0,1fr)_max-content] items-start gap-3 border-2 border-border-secondary bg-bg-panel p-3 sm:grid-cols-[3.5rem_minmax(0,1fr)_max-content] md:h-full md:grid-cols-[4rem_minmax(0,1fr)_max-content]",
					isPurchased && "border-dashed bg-bg-base [&>*]:invisible",
				)}
				aria-hidden={isPurchased}
			>
				<span className="block h-12 w-12 overflow-hidden border-2 border-bg-elevated bg-bg-base sm:h-14 sm:w-14 md:h-16 md:w-16">
					<img
						key={item.id}
						src={resolveImageUrl(item.icon)}
						alt=""
						loading="eager"
						decoding="async"
						className="h-full w-full object-cover"
						aria-hidden
					/>
				</span>

				<div className="grid min-w-0 content-start gap-1 md:hidden">
					<ItemHeading slot={slot} tooltipSlots={tooltipSlots} />
					<Price slot={slot} labelled />
				</div>

				<div className="hidden min-w-0 content-start gap-2 md:grid">
					<ItemHeading slot={slot} tooltipSlots={tooltipSlots} />

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
						{requiresReplacement && (
							<p className="grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] gap-2">
								<span className="text-text-label">Replaces</span>
								<span className="min-w-0 break-words text-text">
									<EquipmentReplacementItems destinations={destinations} />
								</span>
							</p>
						)}
					</div>

					<div className="hidden md:block">
						<ModifierPreview slot={slot} />
						{item.type === "weapon" && item.attackRiders.length > 0 && (
							<AttackRiderTooltipList riders={item.attackRiders} />
						)}
					</div>
				</div>

				<ItemActions
					slot={slot}
					isPending={isPending}
					onBuy={onBuy}
					onLockChange={onLockChange}
					className="md:grid md:self-stretch md:content-between md:justify-items-end"
				/>
			</div>

			{requiresReplacement && (
				<div
					className={clsx("pt-1 md:hidden", isPurchased && "[&>*]:invisible")}
					aria-hidden={isPurchased}
				>
					<p className="min-w-0">
						<span className="mr-1 text-text-label">Replaces:</span>
						<span className="min-w-0 break-words text-text">
							<EquipmentReplacementItems destinations={destinations} />
						</span>
					</p>
				</div>
			)}

			{isPurchased && (
				<div className="pointer-events-none absolute inset-0 grid place-items-center">
					<Badge label="SOLD" className="text-text-muted" />
				</div>
			)}
		</article>
	);
}

function ItemHeading({
	slot,
	tooltipSlots,
}: {
	slot: TownShopSlotView;
	tooltipSlots: readonly EquipmentDestinationView["equipmentSlot"][];
}) {
	const { item } = slot;

	return (
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
		</div>
	);
}

function ItemActions({
	slot,
	isPending,
	onBuy,
	onLockChange,
	className,
}: {
	slot: TownShopSlotView;
	isPending: boolean;
	onBuy: () => void;
	onLockChange: (locked: boolean) => void;
	className?: string;
}) {
	return (
		<div className={clsx("flex items-start gap-2", className)}>
			<Price slot={slot} className="hidden md:block" />
			<div className="flex items-start gap-2">
				<BuyButton
					slot={slot}
					disabled={isPending || slot.purchased || !slot.canAfford}
					onBuy={onBuy}
				/>
				<LockButton slot={slot} isPending={isPending} onLockChange={onLockChange} />
			</div>
		</div>
	);
}

function Price({
	slot,
	labelled = false,
	className,
}: {
	slot: TownShopSlotView;
	labelled?: boolean;
	className?: string;
}) {
	return (
		<p className={clsx("whitespace-nowrap tabular-nums", className)}>
			{labelled && <span className="mr-1 text-text-label">Price:</span>}
			<span className={getPriceClassName(slot)}>{slot.price}g</span>
		</p>
	);
}

function LockButton({
	slot,
	isPending,
	onLockChange,
}: {
	slot: TownShopSlotView;
	isPending: boolean;
	onLockChange: (locked: boolean) => void;
}) {
	const label = `${slot.locked ? "Unlock" : "Lock"} ${slot.item.name}`;

	return (
		<IconButton
			type="button"
			className="aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-contrast enabled:aria-pressed:hover:border-primary enabled:aria-pressed:hover:brightness-90"
			disabled={isPending || slot.purchased}
			aria-pressed={slot.locked}
			aria-label={label}
			title={label}
			onClick={() => onLockChange(!slot.locked)}
		>
			<LockSharp aria-hidden="true" className="h-5 w-5 shrink-0" />
		</IconButton>
	);
}

function BuyButton({
	slot,
	disabled,
	onBuy,
	className,
}: {
	slot: TownShopSlotView;
	disabled: boolean;
	onBuy: () => void;
	className?: string;
}) {
	return (
		<Button
			type="button"
			variant="primary"
			className={clsx(
				"whitespace-nowrap border-border-secondary px-2 tabular-nums",
				className,
			)}
			disabled={disabled}
			aria-label={getBuyLabel(slot)}
			title={getBuyLabel(slot)}
			onClick={onBuy}
		>
			Buy
		</Button>
	);
}

function getPriceClassName(slot: TownShopSlotView) {
	if (!slot.canAfford) {
		return "text-error";
	}

	return "text-text-bright";
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

function getBuyLabel(slot: TownShopSlotView) {
	if (slot.purchased) {
		return `${slot.item.name} already purchased`;
	}

	if (!slot.canAfford) {
		return `Not enough gold to buy ${slot.item.name}`;
	}

	return `Buy ${slot.item.name} for ${slot.price} gold`;
}
