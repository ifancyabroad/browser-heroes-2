import type { TownShopSlotView, TownView } from "@app/engine";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { TownGoldBalance } from "./TownGoldBalance";
import { TownShopGrid } from "./TownShopGrid";

type ShopModalProps = {
	town: Pick<TownView, "gold" | "rerollCost" | "shopSlots">;
	isPending: boolean;
	canReroll: boolean;
	onClose: () => void;
	onReroll: () => void;
	onBuy: (slot: TownShopSlotView) => void;
	onLockChange: (slot: TownShopSlotView, locked: boolean) => void;
};

export function ShopModal({
	town,
	isPending,
	canReroll,
	onClose,
	onReroll,
	onBuy,
	onLockChange,
}: ShopModalProps) {
	return (
		<Modal
			open
			title="Shop"
			size="6xl"
			dismissible={!isPending}
			onClose={onClose}
			footer={
				<div className="flex w-full flex-wrap items-center justify-between gap-3">
					<TownGoldBalance gold={town.gold} />
					<div className="ml-auto flex items-center gap-3">
						<Button
							variant="primary"
							className="gap-2 whitespace-nowrap tabular-nums"
							disabled={isPending || !canReroll}
							onClick={onReroll}
						>
							Reroll <span>{town.rerollCost}g</span>
						</Button>
						<Button disabled={isPending} onClick={onClose}>
							Close
						</Button>
					</div>
				</div>
			}
		>
			<TownShopGrid
				shopSlots={town.shopSlots}
				isPending={isPending}
				onBuy={onBuy}
				onLockChange={onLockChange}
			/>
		</Modal>
	);
}
