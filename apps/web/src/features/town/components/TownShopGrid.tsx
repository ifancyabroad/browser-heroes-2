import type { TownShopSlotView } from "@app/engine";
import { TownShopItemCard } from "./TownShopItemCard";

type TownShopGridProps = {
	shopSlots: readonly TownShopSlotView[];
	isPending: boolean;
	onBuy: (slot: TownShopSlotView) => void;
	onLockChange: (slot: TownShopSlotView, locked: boolean) => void;
};

export function TownShopGrid({ shopSlots, isPending, onBuy, onLockChange }: TownShopGridProps) {
	return (
		<div className="@container/shop">
			<div className="grid grid-cols-1 gap-3 md:gap-4 lg:@xl/shop:grid-cols-2 lg:@3xl/shop:grid-cols-3">
				{shopSlots.map((slot) => (
					<TownShopItemCard
						key={slot.id}
						slot={slot}
						isPending={isPending}
						onBuy={() => onBuy(slot)}
						onLockChange={(locked) => onLockChange(slot, locked)}
					/>
				))}
			</div>
		</div>
	);
}
