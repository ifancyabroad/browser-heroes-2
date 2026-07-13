import type { RewardChoiceOptionView, RewardItemDestinationView } from "@app/engine";
import { ITEMS_BY_ID } from "@app/content";
import clsx from "clsx";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { getItemRarityTextClassName } from "../../../game/itemDisplay";
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
				"grid grid-cols-[3rem_minmax(0,1fr)] gap-3 border bg-bg-elevated p-3 text-left text-base",
				selected
					? "border-info"
					: "border-transparent hover:border-info focus-visible:border-info",
				disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
			)}
		>
			<span className="h-12 w-12 overflow-hidden">
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
								"min-w-0 break-words underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
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
				{option.type === "item" && (
					<CurrentlyEquippedDetail
						destination={content.destination}
						needsReplacementChoice={content.needsReplacementChoice}
					/>
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
			destination: null,
			needsReplacementChoice: false,
			tooltipSlot: null,
		};
	}

	const destinationSlots = option.destinations.map(
		(destinationOption) => destinationOption.equipmentSlot,
	);

	return {
		icon: option.item.icon,
		name: option.item.name,
		destination: option.destinations.length === 1 ? option.destinations[0] : null,
		needsReplacementChoice: option.destinations.length !== 1,
		tooltipSlot: destinationSlots.length > 0 ? destinationSlots : null,
	};
}

function CurrentlyEquippedDetail({
	destination,
	needsReplacementChoice,
}: {
	destination: RewardItemDestinationView | null;
	needsReplacementChoice: boolean;
}) {
	if (needsReplacementChoice || !destination) {
		return (
			<span className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-1">
				<span className="text-text-label">Currently Equipped:</span>
				<span className="text-text">Choose slot</span>
			</span>
		);
	}

	if (destination.replacedItems.length === 0) {
		return (
			<span className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-1">
				<span className="text-text-label">Currently Equipped:</span>
				<span className="text-text">Empty</span>
			</span>
		);
	}

	return (
		<span className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-1">
			<span className="text-text-label">Currently Equipped:</span>
			<span className="min-w-0 break-words text-text">
				<ReplacedItemsInline
					replacedItems={destination.replacedItems}
					fallbackSlot={destination.equipmentSlot}
				/>
			</span>
		</span>
	);
}

type ReplacedItemsInlineProps = {
	replacedItems: RewardItemDestinationView["replacedItems"];
	fallbackSlot: RewardItemDestinationView["equipmentSlot"];
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
