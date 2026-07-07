import type { RewardChoiceOptionView, RewardItemDestinationView } from "@app/engine";
import { ITEMS_BY_ID } from "@app/content";
import clsx from "clsx";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { getEquipmentSlotLabel, getItemRarityTextClassName } from "../../../game/itemDisplay";
import goldIcon from "../../../assets/images/icons/GoldCoinTen.png";

type RewardOptionCardProps = {
	option: RewardChoiceOptionView;
	selected: boolean;
	disabled: boolean;
	onSelect: () => void;
};

export function RewardOptionCard({ option, selected, disabled, onSelect }: RewardOptionCardProps) {
	const content = getOptionContent(option);

	return (
		<button
			type="button"
			role="radio"
			aria-checked={selected}
			disabled={disabled}
			onClick={onSelect}
			className={clsx(
				"grid grid-cols-[3rem_minmax(0,1fr)] gap-3 border-2 bg-bg-elevated p-3 text-left text-base transition-colors",
				selected
					? "border-primary"
					: "border-border hover:border-primary focus-visible:border-primary",
				disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
			)}
		>
			<span className="h-12 w-12 overflow-hidden border border-border bg-bg-base">
				<img
					src={content.icon}
					alt=""
					loading="lazy"
					className="h-full w-full object-cover"
					aria-hidden
				/>
			</span>

			<span className="grid min-w-0 gap-1 self-center">
				<span className="min-w-0">
					{option.type === "item" ? (
						<Tooltip
							content={
								content.tooltipSlot ? (
									<ItemTooltipContent
										item={option.item}
										slot={content.tooltipSlot}
									/>
								) : null
							}
							placement="top"
							className={clsx(
								"min-w-0 break-words underline decoration-border underline-offset-4 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
								getItemRarityTextClassName(option.item.rarity),
							)}
							contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
						>
							{content.name}
						</Tooltip>
					) : (
						<span>{content.name}</span>
					)}
				</span>
				{content.detail && (
					<span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-text-label">
						<BracketBadge>{content.detail}</BracketBadge>
						{option.type === "item" && content.destination && (
							<ReplacementDetail destination={content.destination} />
						)}
						{content.needsReplacementChoice && <span>Choose slot</span>}
					</span>
				)}
			</span>
		</button>
	);
}

function getOptionContent(option: RewardChoiceOptionView) {
	if (option.type === "gold") {
		return {
			icon: goldIcon,
			name: `${option.amount} Gold`,
			detail: null,
			destination: null,
			needsReplacementChoice: false,
			tooltipSlot: null,
		};
	}

	const destination = option.destinations.length === 1 ? option.destinations[0] : null;
	const destinationSlots = option.destinations.map(
		(destinationOption) => destinationOption.equipmentSlot,
	);
	const slotLabel = destination
		? getEquipmentSlotLabel(destination.equipmentSlot)
		: getEquipmentSlotLabel(destinationSlots);

	return {
		icon: option.item.icon,
		name: option.item.name,
		detail: slotLabel,
		destination,
		needsReplacementChoice: !destination,
		tooltipSlot: destinationSlots.length > 0 ? destinationSlots : null,
	};
}

function ReplacementDetail({ destination }: { destination: RewardItemDestinationView }) {
	if (destination.replacedItems.length === 0) {
		return <span>Empty</span>;
	}

	return (
		<span className="flex min-w-0 flex-wrap items-baseline gap-x-1">
			<span>Replaces</span>
			<ReplacedItemsInline
				replacedItems={destination.replacedItems}
				fallbackSlot={destination.equipmentSlot}
			/>
		</span>
	);
}

function BracketBadge({ children }: { children: string }) {
	return (
		<span className="text-primary before:text-text-muted before:content-['['] after:text-text-muted after:content-[']']">
			{children}
		</span>
	);
}

export function formatReplacementItems(replacedItems: RewardItemDestinationView["replacedItems"]) {
	return replacedItems
		.map((replacedItem) => ITEMS_BY_ID[replacedItem.itemId]?.name ?? "Unknown item")
		.join(", ");
}

type ReplacedItemsInlineProps = {
	replacedItems: RewardItemDestinationView["replacedItems"];
	fallbackSlot: RewardItemDestinationView["equipmentSlot"];
};

export function ReplacedItemsInline({ replacedItems, fallbackSlot }: ReplacedItemsInlineProps) {
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
					"underline decoration-border underline-offset-4 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
					getItemRarityTextClassName(item.rarity),
				)}
				contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
			>
				{item.name}
			</Tooltip>
		</span>
	);
}
