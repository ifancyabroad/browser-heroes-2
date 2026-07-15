import type { TownShopSlotView } from "@app/engine";
import { TownShopItemCard } from "./TownShopItemCard";

type TownShopGridProps = {
	shopSlots: readonly TownShopSlotView[];
	isPending: boolean;
	onBuy: (slot: TownShopSlotView) => void;
};

export function TownShopGrid({ shopSlots, isPending, onBuy }: TownShopGridProps) {
	return (
		<div className="grid min-w-0 gap-3 md:grid-cols-2 md:gap-4">
			{shopSlots.map((slot) => (
				<TownShopItemCard
					key={slot.id}
					slot={slot}
					isPending={isPending}
					onBuy={() => onBuy(slot)}
				/>
			))}
		</div>
	);
}
