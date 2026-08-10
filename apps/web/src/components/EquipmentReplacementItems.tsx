import { selectItemDefinition, type EquipmentDestinationView } from "@app/engine";
import clsx from "clsx";
import { getItemRarityTextClassName } from "../presentation/items";
import { Tooltip } from "./Tooltip";
import { ItemTooltipContent } from "./tooltips/ItemTooltipContent";

type EquipmentReplacementItemsProps = {
	destinations: readonly EquipmentDestinationView[];
};

export function EquipmentReplacementItems({ destinations }: EquipmentReplacementItemsProps) {
	const replacements = getUniqueReplacements(destinations);

	return replacements.map(({ replacedItem, fallbackSlot }, index) => {
		const item = selectItemDefinition(replacedItem);

		return (
			<span key={replacedItem.instanceId}>
				{index > 0 && ", "}
				{item ? (
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
				) : (
					"Unknown item"
				)}
			</span>
		);
	});
}

function getUniqueReplacements(destinations: readonly EquipmentDestinationView[]) {
	const replacements = destinations.flatMap((destination) =>
		destination.replacedItems.map((replacedItem) => ({
			replacedItem,
			fallbackSlot: destination.equipmentSlot,
		})),
	);

	return replacements.filter(
		(entry, index) =>
			replacements.findIndex(
				(candidate) => candidate.replacedItem.instanceId === entry.replacedItem.instanceId,
			) === index,
	);
}
