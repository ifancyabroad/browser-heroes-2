import { IconBolt, IconCoins, IconMapPin, IconSwords } from "@tabler/icons-react";
import type { Zone } from "@app/content";
import { formatTitle } from "../../../presentation/effects";

type CombatStatsBarProps = {
	zone: Zone;
	battleNumber: number;
	gold: number;
	goldMultiplier: number;
};

export function CombatStatsBar({ zone, battleNumber, gold, goldMultiplier }: CombatStatsBarProps) {
	return (
		<div
			className="absolute left-1/2 top-2 z-20 w-max -translate-x-1/2 max-w-[calc(100%-1rem)] overflow-x-auto border border-border-secondary bg-bg-base/90 px-2 py-1 text-base tabular-nums sm:left-auto sm:right-2 sm:translate-x-0 sm:px-3 sm:py-2"
			role="group"
			aria-label="Run information"
		>
			<dl className="flex items-center gap-3 sm:grid sm:gap-1">
				{[
					{ label: "Zone", value: formatTitle(zone), icon: IconMapPin },
					{ label: "Battle", value: battleNumber, icon: IconSwords },
					{ label: "Gold", value: gold, icon: IconCoins },
					{ label: "Bonus", value: `×${goldMultiplier}`, icon: IconBolt },
				].map(({ label, value, icon: Icon }) => (
					<div
						key={label}
						className="flex shrink-0 items-center gap-1 sm:grid sm:grid-cols-[5ch_minmax(0,1fr)] sm:gap-3"
					>
						<dt className="text-text-label">
							<Icon aria-hidden="true" className="h-4 w-4 sm:hidden" />
							<span className="sr-only sm:not-sr-only">{label}</span>
						</dt>
						<dd className="whitespace-nowrap text-right text-text-bright">{value}</dd>
					</div>
				))}
			</dl>
		</div>
	);
}
