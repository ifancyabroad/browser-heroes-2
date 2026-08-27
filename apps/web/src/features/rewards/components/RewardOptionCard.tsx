import { type RewardChoiceOptionView } from "@app/engine";
import clsx from "clsx";
import { RadioCard } from "../../../components/RadioCard";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { EquipmentReplacementItems } from "../../../components/EquipmentReplacementItems";
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
	const requiresReplacement =
		option.type === "item" && option.equipmentPlacement.automaticDestination === null;

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
							content={<ItemTooltipContent item={option.item} />}
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
					{option.type === "item" &&
						option.equipmentPlacement.destinations.length > 0 && (
							<span>
								<span className="mr-1 text-text-label">Slot:</span>
								<span className="text-text">
									{getEquipmentSlotLabel(
										option.equipmentPlacement.destinations.map(
											(destination) => destination.equipmentSlot,
										),
									)}
								</span>
							</span>
						)}
				</span>
			</RadioCard>

			{requiresReplacement && (
				<p className="min-w-0 pt-1">
					<span className="mr-1 text-text-label">Replaces:</span>
					<span className="min-w-0 break-words text-text">
						<EquipmentReplacementItems
							destinations={option.equipmentPlacement.destinations}
						/>
					</span>
				</p>
			)}
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

	const destinationSlots = option.equipmentPlacement.destinations.map(
		(destinationOption) => destinationOption.equipmentSlot,
	);

	return {
		icon: resolveImageUrl(option.item.icon),
		name: option.item.name,
		tooltipSlot: destinationSlots.length > 0 ? destinationSlots : null,
	};
}
