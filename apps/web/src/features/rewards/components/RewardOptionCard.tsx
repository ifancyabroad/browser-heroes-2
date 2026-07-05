import type { RewardChoiceOptionView, RewardItemDestinationView } from "@app/engine";
import { ITEMS_BY_ID } from "@app/content";
import clsx from "clsx";
import { Tooltip } from "../../../components/Tooltip";
import {
	getItemRarityTextClassName,
	ItemTooltipContent,
} from "../../../components/tooltips/ItemTooltipContent";
import { equipmentSlotLabels, itemRarityLabels } from "../../../game/displayLabels";
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
				<span className="flex flex-wrap items-baseline gap-x-2">
					{option.type === "item" ? (
						<Tooltip
							content={
								<ItemTooltipContent
									item={option.item}
									slot={
										content.tooltipSlot ?? option.destinations[0]?.equipmentSlot
									}
								/>
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
						<span className="text-text-bright">{content.name}</span>
					)}
					<span className="text-text-label">{content.typeLabel}</span>
				</span>
				{content.description && <span className="text-text">{content.description}</span>}
				{content.replacementLabel && (
					<span className="text-text-label">{content.replacementLabel}</span>
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
			typeLabel: "Currency",
			description: null,
			replacementLabel: null,
			tooltipSlot: null,
		};
	}

	const destination = option.destinations.length === 1 ? option.destinations[0] : null;
	const slotLabel = destination
		? equipmentSlotLabels[destination.equipmentSlot]
		: option.destinations
				.map((destinationOption) => equipmentSlotLabels[destinationOption.equipmentSlot])
				.join(" / ");

	return {
		icon: option.item.icon,
		name: option.item.name,
		typeLabel: `${itemRarityLabels[option.item.rarity]} ${
			option.item.type === "weapon" ? "Weapon" : "Armour"
		}`,
		description: slotLabel,
		replacementLabel: destination
			? getReplacementLabel(destination)
			: "Choose replacement slot",
		tooltipSlot: destination?.equipmentSlot ?? option.destinations[0]?.equipmentSlot,
	};
}

function getReplacementLabel(destination: RewardItemDestinationView) {
	if (destination.replacedItems.length === 0) {
		return `Equips to empty ${equipmentSlotLabels[destination.equipmentSlot]}`;
	}

	return `Replaces ${formatReplacementItems(destination.replacedItems)}`;
}

export function formatReplacementItems(replacedItems: RewardItemDestinationView["replacedItems"]) {
	return replacedItems
		.map((replacedItem) => ITEMS_BY_ID[replacedItem.itemId]?.name ?? "Unknown item")
		.join(", ");
}
