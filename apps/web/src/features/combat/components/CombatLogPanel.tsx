import { Fragment, useEffect, useRef } from "react";
import clsx from "clsx";
import type { CombatLogEntry } from "@app/engine";
import { getCombatLogEntryClassName } from "../utils/combatLogPresentation";

type CombatLogPanelProps = {
	entries: CombatLogEntry[];
	className?: string;
};

export function CombatLogPanel({ entries, className }: CombatLogPanelProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const logNode = scrollRef.current;

		if (logNode) {
			logNode.scrollTop = logNode.scrollHeight;
		}
	}, [entries.length]);

	return (
		<div
			ref={scrollRef}
			className={clsx("min-h-0 overflow-y-auto text-base", className)}
			aria-label="Combat log"
		>
			<div className="flex min-h-full flex-col justify-end">
				{entries.map((entry, index) => {
					const showTurnHeading = entry.turnNumber !== entries[index - 1]?.turnNumber;

					return (
						<Fragment key={entry.id}>
							{showTurnHeading && (
								<p className="mt-2 text-info first:mt-0">
									Round {entry.turnNumber}
								</p>
							)}
							<p className={getCombatLogEntryClassName(entry, showTurnHeading)}>
								{entry.message}
							</p>
						</Fragment>
					);
				})}
			</div>
		</div>
	);
}
