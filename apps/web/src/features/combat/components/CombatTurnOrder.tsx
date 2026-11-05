import type { CombatTurnOrderEntry } from "@app/engine";
import { IconCircleNumber1, IconCircleNumber2 } from "@tabler/icons-react";
import clsx from "clsx";
import { Tooltip } from "../../../components/Tooltip";

type CombatTurnOrderProps = {
	turnOrder: CombatTurnOrderEntry[];
	heroId: string;
};

export function CombatTurnOrder({ turnOrder, heroId }: CombatTurnOrderProps) {
	return (
		<Tooltip content="Turn order" placement="bottom" className="min-w-0">
			<section
				className="min-w-0 border border-border-secondary bg-bg-base/90 px-2 py-1 text-base tabular-nums md:px-3 md:py-2"
				aria-label="Turn order"
			>
				<ol className="grid min-w-0 gap-1">
					{turnOrder.map(({ id, shortName }, index) => {
						const OrderIcon = index === 0 ? IconCircleNumber1 : IconCircleNumber2;

						return (
							<li
								key={id}
								className="grid min-w-0 grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-2"
							>
								<OrderIcon
									aria-hidden="true"
									className="h-4 w-4 self-center text-text-label"
								/>
								<span
									className={clsx(
										"min-w-0 wrap-anywhere",
										id === heroId ? "text-primary" : "text-text-bright",
									)}
								>
									{shortName}
								</span>
							</li>
						);
					})}
				</ol>
			</section>
		</Tooltip>
	);
}
