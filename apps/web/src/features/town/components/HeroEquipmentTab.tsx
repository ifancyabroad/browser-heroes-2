import { equipmentSlots, ITEMS_BY_ID } from "@app/content";
import type { HeroView } from "@app/engine";
import clsx from "clsx";
import { Tooltip } from "../../../components/Tooltip";
import { equipmentSlotLabels } from "../../../game/displayLabels";
import { getItemRarityTextClassName, ItemTooltipContent } from "./ItemTooltipContent";

type HeroEquipmentTabProps = {
	equipment: HeroView["equipment"];
};

export function HeroEquipmentTab({ equipment }: HeroEquipmentTabProps) {
	return (
		<div className="grid gap-2">
			{equipmentSlots.map((slot) => {
				const equippedItem = equipment[slot];
				const item = equippedItem ? ITEMS_BY_ID[equippedItem.itemId] : null;

				return (
					<div
						key={slot}
						className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-3"
					>
						<p className="text-text-label">{equipmentSlotLabels[slot]}</p>
						{item ? (
							<Tooltip
								content={<ItemTooltipContent item={item} slot={slot} />}
								placement="right"
								className={clsx(
									"min-w-0 max-w-full justify-self-end break-words text-right underline decoration-border underline-offset-4 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
									getItemRarityTextClassName(item.rarity),
								)}
								contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
							>
								{item.name}
							</Tooltip>
						) : (
							<p className="min-w-0 break-words text-right text-text-muted">Empty</p>
						)}
					</div>
				);
			})}
		</div>
	);
}
