import type { TownView } from "@app/engine";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { TownGoldBalance } from "./TownGoldBalance";
import { TAVERN_QUOTES } from "../quotes";
import tavernKeeper from "../../../assets/images/town/tavern-keeper.png";

type TavernModalProps = {
	town: Pick<TownView, "gold" | "restCost" | "canAffordRest" | "isFullyRested">;
	isPending: boolean;
	canRest: boolean;
	onClose: () => void;
	onRest: () => void;
};

export function TavernModal({ town, isPending, canRest, onClose, onRest }: TavernModalProps) {
	const [quote] = useState(() => TAVERN_QUOTES[Math.floor(Math.random() * TAVERN_QUOTES.length)]);
	return (
		<Modal
			open
			title="Tavern"
			size="md"
			dismissible={!isPending}
			onClose={onClose}
			footer={
				<div className="flex w-full flex-wrap items-center justify-between gap-3">
					<TownGoldBalance gold={town.gold} />
					<div className="ml-auto flex items-center gap-3">
						<Button disabled={isPending} onClick={onClose}>
							Close
						</Button>
						<Button variant="primary" disabled={isPending || !canRest} onClick={onRest}>
							Confirm
						</Button>
					</div>
				</div>
			}
		>
			<div className="mb-5 flex items-center gap-3">
				<img
					src={tavernKeeper}
					alt="Tavern keeper"
					className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
				/>
				<p className="min-w-0 text-text-muted">{quote}</p>
			</div>
			{town.isFullyRested ? (
				<p className="text-success">You are already fully rested.</p>
			) : town.canAffordRest ? (
				<p>
					Would you like to rest for{" "}
					<span className="tabular-nums text-text-bright">{town.restCost} gold</span>?
				</p>
			) : (
				<p className="text-error">You don’t have enough gold to rest.</p>
			)}
		</Modal>
	);
}
