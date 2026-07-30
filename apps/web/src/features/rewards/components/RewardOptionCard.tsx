import {
	selectItemDefinition,
	type RewardChoiceOptionView,
	type RewardItemDestinationView,
} from "@app/engine";
import clsx from "clsx";
import { RadioCard } from "../../../components/RadioCard";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { getItemRarityTextClassName } from "../../../presentation/items";
import goldIcon from "../../../assets/images/icons/GoldCoinTen.png";
import { resolveImageUrl } from "../../../utils/image";

type RewardOptionCardProps = {
	option: RewardChoiceOptionView;
	value: string;
	selected: boolean;
	disabled: boolean;
};

export function RewardOptionCard({ option, value, selected, disabled }: RewardOptionCardProps) {
	const content = getOptionContent(option);

	return (
		<RadioCard
			value={value}
			selected={selected}
			selectionLabel={`Select ${content.name}`}
			disabled={disabled}
			className="grid-cols-[3rem_minmax(0,1fr)] gap-3"
		>
			<span className="h-12 w-12 overflow-hidden border-2 border-bg-elevated bg-bg-base">
				<img
					src={content.icon}
					alt=""
					loading="lazy"
					className="h-full w-full object-cover"
					aria-hidden
				/>
			</span>

			<span className="grid min-w-0 gap-1 self-center">
				{option.type === "item" && content.tooltipSlot ? (
					<Tooltip
						content={
							<ItemTooltipContent item={option.item} slot={content.tooltipSlot} />
						}
						className={clsx(
							"w-fit min-w-0 max-w-full break-words underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
							getItemRarityTextClassName(option.item.rarity),
						)}
						contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
					>
						{content.name}
					</Tooltip>
				) : (
					<span>{content.name}</span>
				)}
				{option.type === "item" && (
					<CurrentEquipmentDetail destinations={option.destinations} />
				)}
			</span>
		</RadioCard>
	);
}

function getOptionContent(option: RewardChoiceOptionView) {
	if (option.type === "gold") {
		return {
			icon: goldIcon,
			name: `${option.amount} Gold`,
			tooltipSlot: null,
		};
	}

	const destinationSlots = option.destinations.map(
		(destinationOption) => destinationOption.equipmentSlot,
	);

	return {
		icon: resolveImageUrl(option.item.icon),
		name: option.item.name,
		tooltipSlot: destinationSlots.length > 0 ? destinationSlots : null,
	};
}

function CurrentEquipmentDetail({
	destinations,
}: {
	destinations: readonly RewardItemDestinationView[];
}) {
	if (destinations.length === 0) {
		return null;
	}

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

	return (
		<span className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-1">
			<span className="text-text-label">Current</span>
			<span className="min-w-0 break-words text-text">
				{uniqueReplacedItems.map((entry, index) => (
					<ReplacedItemTooltip
						key={entry.replacedItem.instanceId}
						replacedItem={entry.replacedItem}
						fallbackSlot={entry.fallbackSlot}
						prefix={index > 0 ? ", " : ""}
					/>
				))}
				{includesEmpty && (
					<span>{uniqueReplacedItems.length > 0 ? ", Empty" : "Empty"}</span>
				)}
			</span>
		</span>
	);
}

type ReplacedItemTooltipProps = {
	replacedItem: RewardItemDestinationView["replacedItems"][number];
	fallbackSlot: RewardItemDestinationView["equipmentSlot"];
	prefix: string;
};

function ReplacedItemTooltip({ replacedItem, fallbackSlot, prefix }: ReplacedItemTooltipProps) {
	const item = selectItemDefinition(replacedItem);

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
