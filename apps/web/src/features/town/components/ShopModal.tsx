import type { TownShopSlotView, TownView } from "@app/engine";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { TownGoldBalance } from "./TownGoldBalance";
import { TownShopGrid } from "./TownShopGrid";
import { MERCHANT_QUOTES } from "../quotes";
import merchantPortrait from "../../../assets/images/town/merchant-portrait.png";

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
	const [quote] = useState(
		() => MERCHANT_QUOTES[Math.floor(Math.random() * MERCHANT_QUOTES.length)],
	);
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
			<div className="mb-5 flex items-center gap-3">
				<img
					src={merchantPortrait}
					alt="Merchant"
					className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
				/>
				<p className="min-w-0 text-text-muted">{quote}</p>
			</div>
			<TownShopGrid
				shopSlots={town.shopSlots}
				isPending={isPending}
				onBuy={onBuy}
				onLockChange={onLockChange}
			/>
		</Modal>
	);
}
