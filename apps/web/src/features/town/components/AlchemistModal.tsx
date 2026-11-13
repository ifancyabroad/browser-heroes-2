import type { TownView } from "@app/engine";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { TownGoldBalance } from "./TownGoldBalance";
import { DotLeader } from "./DotLeader";
import { ALCHEMIST_QUOTES } from "../quotes";
import alchemistPortrait from "../../../assets/images/town/alchemist-portrait.png";

type AlchemistModalProps = {
	town: Pick<
		TownView,
		| "gold"
		| "healingPotions"
		| "maxHealingPotions"
		| "healingPotionCost"
		| "canAffordHealingPotion"
	>;
	isPending: boolean;
	canBuyPotion: boolean;
	onClose: () => void;
	onBuyPotion: () => void;
};

export function AlchemistModal({
	town,
	isPending,
	canBuyPotion,
	onClose,
	onBuyPotion,
}: AlchemistModalProps) {
	const [quote] = useState(
		() => ALCHEMIST_QUOTES[Math.floor(Math.random() * ALCHEMIST_QUOTES.length)],
	);
	const potionsFull = town.healingPotions >= town.maxHealingPotions;
	return (
		<Modal
			open
			title="Alchemist"
			size="md"
			dismissible={!isPending}
			onClose={onClose}
			footer={
				<div className="flex w-full items-center justify-between gap-3">
					<TownGoldBalance gold={town.gold} />
					<Button disabled={isPending} onClick={onClose}>
						Close
					</Button>
				</div>
			}
		>
			<div className="mb-5 flex items-center gap-3">
				<img
					src={alchemistPortrait}
					alt="Alchemist"
					className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
				/>
				<p className="min-w-0 text-text-muted">{quote}</p>
			</div>
			<p
				className={clsx(
					"tabular-nums",
					potionsFull
						? "text-success"
						: town.healingPotions === 0
							? "text-error"
							: "text-text",
				)}
			>
				{town.healingPotions}/{town.maxHealingPotions}
				{potionsFull ? " MAX" : " potions"}
			</p>
			<dl className="mt-5 tabular-nums">
				<div className="flex items-center gap-2 sm:gap-3">
					<dt className="flex min-w-0 flex-1 items-baseline gap-2 sm:gap-3">
						<span className="shrink-0">Healing Potion</span>
						<DotLeader />
					</dt>
					<dd className="flex shrink-0 items-center gap-2 sm:gap-3">
						<span
							className={clsx(
								"whitespace-nowrap text-right",
								town.canAffordHealingPotion ? "text-text-bright" : "text-error",
							)}
						>
							{town.healingPotionCost}g
						</span>
						<Button
							variant="primary"
							className="w-16 shrink-0 px-2!"
							aria-label="Buy one healing potion"
							disabled={isPending || !canBuyPotion}
							onClick={onBuyPotion}
						>
							Buy
						</Button>
					</dd>
				</div>
			</dl>
			{!town.canAffordHealingPotion && !potionsFull && (
				<p className="mt-3 text-error">Not enough gold.</p>
			)}
		</Modal>
	);
}
