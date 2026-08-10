import {
	selectItemDefinition,
	type RewardChoiceOptionView,
	type RewardItemDestinationView,
} from "@app/engine";
import clsx from "clsx";
import { RadioCard } from "../../../components/RadioCard";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { getEquipmentSlotLabel, getItemRarityTextClassName } from "../../../presentation/items";
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
	const replacements = option.type === "item" ? getUniqueReplacements(option.destinations) : [];

	return (
		<div className="min-w-0">
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
					{option.type === "item" && option.destinations.length > 0 && (
						<span>
							<span className="mr-1 text-text-label">Slot:</span>
							<span className="text-text">
								{getEquipmentSlotLabel(
									option.destinations.map(
										(destination) => destination.equipmentSlot,
									),
								)}
							</span>
						</span>
					)}
				</span>
			</RadioCard>

			<ReplacementDetail replacements={replacements} />
		</div>
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

type Replacement = {
	replacedItem: RewardItemDestinationView["replacedItems"][number];
	fallbackSlot: RewardItemDestinationView["equipmentSlot"];
};

function ReplacementDetail({ replacements }: { replacements: readonly Replacement[] }) {
	if (replacements.length === 0) {
		return null;
	}

	return (
		<p className="min-w-0 pt-1">
			<span className="mr-1 text-text-label">Replaces:</span>
			<span className="min-w-0 break-words text-text">
				{replacements.map((replacement, index) => (
					<ReplacedItemTooltip
						key={replacement.replacedItem.instanceId}
						{...replacement}
						prefix={index > 0 ? ", " : ""}
					/>
				))}
			</span>
		</p>
	);
}

function getUniqueReplacements(destinations: readonly RewardItemDestinationView[]): Replacement[] {
	const replacedItems = destinations.flatMap((destination) =>
		destination.replacedItems.map((replacedItem) => ({
			replacedItem,
			fallbackSlot: destination.equipmentSlot,
		})),
	);
	return replacedItems.filter(
		(entry, index) =>
			replacedItems.findIndex(
				(candidate) => candidate.replacedItem.instanceId === entry.replacedItem.instanceId,
			) === index,
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
