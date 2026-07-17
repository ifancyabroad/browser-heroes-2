import type { UserStatsSummaryView } from "@app/shared";

type SummaryItem = {
	label: string;
	value: number | string;
};

export function StatsSummary({
	tab,
	summary,
}: {
	tab: "heroes" | "ghosts";
	summary: UserStatsSummaryView;
}) {
	const items: SummaryItem[] =
		tab === "heroes"
			? [
					{ label: "WINS", value: summary.runs.retired },
					{ label: "KILLS", value: summary.runs.totalKills },
					{ label: "DEATHS", value: summary.runs.dead },
					{ label: "RECORD", value: `Battle ${summary.runs.bestBattleNumber}` },
				]
			: [
					{ label: "GHOSTS", value: summary.ghosts.total },
					{ label: "KILLS", value: summary.ghosts.kills },
					{ label: "DEATHS", value: summary.ghosts.deaths },
					{ label: "WIN RATE", value: `${Math.round(summary.ghosts.winRate * 100)}%` },
				];

	return (
		<dl className="grid grid-cols-2 gap-x-6 gap-y-3 px-3 py-4 sm:grid-cols-4">
			{items.map((item) => (
				<div key={item.label} className="flex items-baseline gap-2">
					<dt className="text-text-label">{item.label}</dt>
					<dd className="text-text-bright">{item.value}</dd>
				</div>
			))}
		</dl>
	);
}
