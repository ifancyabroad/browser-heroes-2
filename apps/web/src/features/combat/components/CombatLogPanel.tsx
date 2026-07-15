import { Fragment, useEffect, useRef } from "react";
import clsx from "clsx";
import type { CombatLogEntry } from "@app/engine";

type CombatLogPanelProps = {
	entries: CombatLogEntry[];
	className?: string;
};

const logActorClass: Record<CombatLogEntry["actor"], string> = {
	enemy: "text-text",
	player: "text-text-bright",
	system: "text-text-muted",
};

export function CombatLogPanel({ entries, className }: CombatLogPanelProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const logNode = scrollRef.current;

		if (logNode) {
			logNode.scrollTop = logNode.scrollHeight;
		}
	}, [entries.length]);

	let previousTurnNumber: number | null = null;

	return (
		<div
			ref={scrollRef}
			className={clsx("min-h-0 overflow-y-auto text-base", className)}
			aria-label="Combat log"
		>
			<div className="flex min-h-full flex-col justify-end">
				{entries.map((entry) => {
					const showTurnHeading = entry.turnNumber !== previousTurnNumber;
					previousTurnNumber = entry.turnNumber;

					return (
						<Fragment key={entry.id}>
							{showTurnHeading && (
								<p className="mt-2 text-text-label first:mt-0">
									Round {entry.turnNumber}
								</p>
							)}
							<p className={clsx("break-words", logActorClass[entry.actor])}>
								{entry.message}
							</p>
						</Fragment>
					);
				})}
			</div>
		</div>
	);
}
