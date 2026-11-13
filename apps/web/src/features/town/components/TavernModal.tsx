import type { TownView } from "@app/engine";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { TownGoldBalance } from "./TownGoldBalance";
import { DotLeader } from "./DotLeader";
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
					src={tavernKeeper}
					alt="Tavern keeper"
					className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
				/>
				<p className="min-w-0 text-text-muted">{quote}</p>
			</div>
			<dl className="tabular-nums">
				<div className="flex items-center gap-2 sm:gap-3">
					<dt className="flex min-w-0 flex-1 items-baseline gap-2 sm:gap-3">
						<span className="shrink-0">Rest</span>
						<DotLeader />
					</dt>
					<dd className="flex shrink-0 items-center gap-2 sm:gap-3">
						<span
							className={clsx(
								"whitespace-nowrap text-right",
								town.canAffordRest ? "text-text-bright" : "text-error",
							)}
						>
							{town.restCost}g
						</span>
						<Button
							variant="primary"
							className="w-16 shrink-0 px-2!"
							aria-label="Buy rest"
							disabled={isPending || !canRest}
							onClick={onRest}
						>
							Buy
						</Button>
					</dd>
				</div>
			</dl>
			{town.isFullyRested ? (
				<p className="mt-3 text-success">Fully rested</p>
			) : !town.canAffordRest ? (
				<p className="mt-3 text-error">Not enough gold to rest.</p>
			) : null}
		</Modal>
	);
}
