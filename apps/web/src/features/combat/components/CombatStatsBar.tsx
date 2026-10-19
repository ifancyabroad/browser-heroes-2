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
			className="absolute left-2 top-2 z-10 w-max max-w-[calc(100%-1rem)] border border-border-secondary bg-bg-base/90 px-2 py-1 text-base tabular-nums sm:px-3 sm:py-2"
			role="group"
			aria-label="Run information"
		>
			<dl className="grid gap-1">
				{[
					{ label: "Zone", value: formatTitle(zone), icon: IconMapPin },
					{ label: "Battle", value: battleNumber, icon: IconSwords },
					{ label: "Gold", value: gold, icon: IconCoins },
					{ label: "Bonus", value: `×${goldMultiplier}`, icon: IconBolt },
				].map(({ label, value, icon: Icon }) => (
					<div
						key={label}
						className="grid grid-cols-[1rem_minmax(0,1fr)] items-center gap-1 sm:grid-cols-[5ch_minmax(0,1fr)] sm:gap-3"
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
