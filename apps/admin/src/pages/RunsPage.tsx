import type { AdminRunModeMetricsRow } from "@app/shared";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useOutletContext } from "react-router-dom";
import type { DashboardContext } from "../components/DashboardLayout";
import { EmptyState, QueryError, QueryLoading } from "../components/QueryState";
import { Stat } from "../components/Stat";
import { SortableHeader } from "../components/SortableHeader";
import { useRunMetrics } from "../features/metrics";
import { useTableSort } from "../hooks/useTableSort";

const percent = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });
const modeNames = { normal: "Normal", dailyChallenge: "Daily challenge" } as const;
type SortKey = keyof Pick<
	AdminRunModeMetricsRow,
	| "runsStarted"
	| "share"
	| "active"
	| "dead"
	| "retired"
	| "abandoned"
	| "averageBattleReached"
	| "averageKills"
	| "finalBossCompletionRate"
>;

export function RunsPage() {
	const { filters } = useOutletContext<DashboardContext>();
	const query = useRunMetrics(filters);
	const sort = useTableSort<AdminRunModeMetricsRow, SortKey>(
		query.data?.modes ?? [],
		"runsStarted",
	);

	if (query.isPending) {
		return <QueryLoading />;
	}

	if (query.isError) {
		return <QueryError onRetry={() => void query.refetch()} />;
	}

	if (query.data.totals.runsStarted === 0) {
		return <EmptyState />;
	}

	const { totals } = query.data;

	return (
		<main className="dashboard">
			<div className="page-title">
				<div>
					<h2>Run performance</h2>
					<p>Latest outcomes for runs started within the selected UTC dates.</p>
				</div>
				{query.isFetching ? <span className="refreshing">Refreshing…</span> : null}
			</div>
			<section className="stat-grid">
				<Stat
					label="Runs started"
					value={totals.runsStarted}
					detail={`${totals.active} active`}
				/>
				<Stat
					label="Resolved runs"
					value={totals.resolvedRuns}
					detail={`${totals.dead} dead · ${totals.retired} retired`}
				/>
				<Stat
					label="Abandonment rate"
					value={percent.format(totals.abandonmentRate)}
					detail={`${totals.abandoned} abandoned`}
				/>
				<Stat
					label="Final boss completion"
					value={percent.format(totals.finalBossCompletionRate)}
					detail={`${totals.finalBossCompletions} completed`}
				/>
				<Stat
					label="Average battle reached"
					value={totals.averageBattleReached.toFixed(1)}
					detail={`${totals.runsStarted} runs`}
				/>
				<Stat
					label="Average kills"
					value={totals.averageKills.toFixed(1)}
					detail={`${totals.runsStarted} runs`}
				/>
			</section>
			<section className="chart-grid">
				<article className="panel wide">
					<div className="panel-heading">
						<h3>Run cohorts by start date</h3>
						<p>Current outcomes grouped by the UTC date each run began.</p>
					</div>
					<ResponsiveContainer width="100%" height={330}>
						<BarChart data={query.data.daily}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis dataKey="date" />
							<YAxis allowDecimals={false} />
							<Tooltip
								formatter={(value, _name, item) => [
									Number(value),
									`Runs (${percent.format(item.payload.percentage)})`,
								]}
							/>
							<Legend />
							<Bar
								dataKey="active"
								name="Active"
								stackId="outcomes"
								fill="var(--accent)"
							/>
							<Bar
								dataKey="dead"
								name="Dead"
								stackId="outcomes"
								fill="var(--danger)"
							/>
							<Bar
								dataKey="retired"
								name="Retired"
								stackId="outcomes"
								fill="var(--success)"
							/>
							<Bar
								dataKey="abandoned"
								name="Abandoned"
								stackId="outcomes"
								fill="var(--neutral)"
							/>
						</BarChart>
					</ResponsiveContainer>
				</article>
				<article className="panel wide">
					<div className="panel-heading">
						<h3>Latest battle reached</h3>
						<p>Distribution across all runs in the selected cohort.</p>
					</div>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={query.data.depth}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis dataKey="label" />
							<YAxis allowDecimals={false} />
							<Tooltip />
							<Bar
								dataKey="runs"
								name="Runs"
								fill="var(--accent)"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</article>
			</section>
			<article className="panel table-panel">
				<div className="panel-heading">
					<h3>Mode breakdown</h3>
					<p>Rates use runs started in each mode as their sample.</p>
				</div>
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>Mode</th>
								<SortableHeader
									label="Runs"
									value="runsStarted"
									{...sort.headerProps}
								/>
								<SortableHeader label="Share" value="share" {...sort.headerProps} />
								<SortableHeader
									label="Active"
									value="active"
									{...sort.headerProps}
								/>
								<SortableHeader label="Dead" value="dead" {...sort.headerProps} />
								<SortableHeader
									label="Retired"
									value="retired"
									{...sort.headerProps}
								/>
								<SortableHeader
									label="Abandoned"
									value="abandoned"
									{...sort.headerProps}
								/>
								<SortableHeader
									label="Avg. battle"
									value="averageBattleReached"
									{...sort.headerProps}
								/>
								<SortableHeader
									label="Avg. kills"
									value="averageKills"
									{...sort.headerProps}
								/>
								<SortableHeader
									label="Boss completion"
									value="finalBossCompletionRate"
									{...sort.headerProps}
								/>
							</tr>
						</thead>
						<tbody>
							{sort.rows.map((row) => (
								<ModeRow key={row.mode} row={row} />
							))}
						</tbody>
					</table>
				</div>
			</article>
		</main>
	);
}

function ModeRow({ row }: { row: AdminRunModeMetricsRow }) {
	return (
		<tr>
			<td>
				<strong>{modeNames[row.mode]}</strong>
				<small>{row.mode}</small>
			</td>
			<td>{row.runsStarted}</td>
			<td>{percent.format(row.share)}</td>
			<td>{row.active}</td>
			<td>{row.dead}</td>
			<td>{row.retired}</td>
			<td>{row.abandoned}</td>
			<td>{row.averageBattleReached.toFixed(1)}</td>
			<td>{row.averageKills.toFixed(1)}</td>
			<td>
				{percent.format(row.finalBossCompletionRate)}
				<small>{row.finalBossCompletions} completed</small>
			</td>
		</tr>
	);
}
