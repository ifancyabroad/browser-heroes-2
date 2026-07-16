import type { TownShopSlotView } from "@app/engine";
import { TownShopItemCard } from "./TownShopItemCard";

type TownShopGridProps = {
	shopSlots: readonly TownShopSlotView[];
	isPending: boolean;
	onBuy: (slot: TownShopSlotView) => void;
};

export function TownShopGrid({ shopSlots, isPending, onBuy }: TownShopGridProps) {
	return (
		<div className="grid min-w-0 gap-3 xl:grid-cols-2 xl:gap-4">
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
