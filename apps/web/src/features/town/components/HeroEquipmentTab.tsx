import { equipmentSlots } from "@app/content";
import { selectItemDefinition, type HeroView } from "@app/engine";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import { Tooltip } from "../../../components/Tooltip";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { getEquipmentSlotLabel, getItemRarityTextClassName } from "../../../presentation/items";

type HeroEquipmentTabProps = {
	equipment: HeroView["equipment"];
	canSwap: boolean;
	isPending: boolean;
	onSwap: () => void;
};

export function HeroEquipmentTab({ equipment, canSwap, isPending, onSwap }: HeroEquipmentTabProps) {
	return (
		<div className="grid gap-2">
			{equipmentSlots.map((slot) => {
				const equippedItem = equipment[slot];
				const item = equippedItem ? selectItemDefinition(equippedItem) : null;

				return (
					<div
						key={slot}
						className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-3"
					>
						<p className="text-text-label">{getEquipmentSlotLabel(slot)}</p>
						{item ? (
							<Tooltip
								content={<ItemTooltipContent item={item} />}
								placement="right"
								className={clsx(
									"min-w-0 max-w-full justify-self-end break-words text-right underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
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

			<Button type="button" disabled={!canSwap || isPending} onClick={onSwap}>
				Swap Weapons
			</Button>
		</div>
	);
}
