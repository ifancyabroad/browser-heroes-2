import { equipmentSlots, ITEMS_BY_ID } from "@app/content";
import type { HeroView } from "@app/engine";
import clsx from "clsx";
import { equipmentSlotLabels } from "../../../game/displayLabels";

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
						<p
							className={clsx(
								"min-w-0 break-words text-right",
								item ? "text-text-bright" : "text-text-muted",
							)}
						>
							{item ? item.name : "Empty"}
						</p>
					</div>
				);
			})}
		</div>
	);
}
