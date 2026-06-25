type CombatStatsBarProps = {
	battleNumber: number;
	goldMultiplier: number;
	turnNumber: number;
	zoneLabel: string;
};

export function CombatStatsBar({
	battleNumber,
	goldMultiplier,
	turnNumber,
	zoneLabel,
}: CombatStatsBarProps) {
	const stats = [
		{ label: "Zone", value: zoneLabel },
		{ label: "Battle", value: battleNumber },
		{ label: "Turn", value: turnNumber },
		{ label: "Gold", value: `${goldMultiplier}x` },
	];

	return (
		<header className="flex flex-wrap items-center justify-end gap-x-6 gap-y-1">
			<dl className="flex flex-wrap items-center justify-end gap-x-6 gap-y-1">
				{stats.map((stat) => (
					<div key={stat.label} className="flex items-center gap-2">
						<dt className="text-text-label">{stat.label}</dt>
						<dd className="text-text-bright">{stat.value}</dd>
					</div>
				))}
			</dl>
		</header>
	);
}
