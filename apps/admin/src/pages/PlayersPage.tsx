import type { AdminPlayerTypeMetricsRow } from "@app/shared";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useOutletContext } from "react-router-dom";
import type { DashboardContext } from "../components/DashboardLayout";
import { EmptyState, QueryError, QueryLoading } from "../components/QueryState";
import { Stat } from "../components/Stat";
import { usePlayerMetrics } from "../features/metrics";
import { shortDate } from "../lib/dates";

const number = new Intl.NumberFormat("en-GB");
const percent = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

export function PlayersPage() {
	const { filters } = useOutletContext<DashboardContext>();
	const query = usePlayerMetrics(filters);

	if (query.isPending) {
		return <QueryLoading />;
	}

	if (query.isError) {
		return <QueryError onRetry={() => void query.refetch()} />;
	}

	if (query.data.totals.activePlayers === 0 && query.data.totals.newPlayers === 0) {
		return <EmptyState />;
	}

	const { totals } = query.data;
	const retention = query.data.retention.map((row) => ({ ...row, label: `D${row.day}` }));

	return (
		<main className="dashboard">
			<div className="page-title">
				<div>
					<h2>Player engagement</h2>
					<p>
						Anonymous identity activity and return behaviour across the selected UTC
						dates.
					</p>
				</div>
				{query.isFetching ? <span className="refreshing">Refreshing…</span> : null}
			</div>
			<section className="stat-grid">
				<Stat
					label="Active players"
					value={number.format(totals.activePlayers)}
					detail="Started a run or submitted an action"
				/>
				<Stat
					label="New identities"
					value={number.format(totals.newPlayers)}
					detail="Created within the selected dates"
				/>
				<Stat
					label="Returning players"
					value={number.format(totals.returningPlayers)}
					detail="Pre-existing identities active in the range"
				/>
				<Stat
					label="Repeat players"
					value={number.format(totals.repeatPlayers)}
					detail="Started at least two runs in the range"
				/>
			</section>
			<section className="stat-grid">
				<Stat
					label="Runs per active player"
					value={totals.runsPerActivePlayer.toFixed(1)}
					detail={`${number.format(totals.runsStarted)} runs started`}
				/>
			</section>
			<section className="chart-grid">
				<article className="panel wide">
					<div className="panel-heading">
						<h3>Daily players</h3>
						<p>New identities are independent of the selected run mode.</p>
					</div>
					<ResponsiveContainer width="100%" height={320}>
						<LineChart data={query.data.daily} margin={{ left: -18, right: 12 }}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis dataKey="date" tickFormatter={shortDate} minTickGap={28} />
							<YAxis allowDecimals={false} />
							<Tooltip />
							<Legend />
							<Line
								type="monotone"
								dataKey="activePlayers"
								name="Active players"
								stroke="var(--accent)"
								strokeWidth={2}
								dot={false}
							/>
							<Line
								type="monotone"
								dataKey="newPlayers"
								name="New identities"
								stroke="var(--violet)"
								strokeWidth={2}
								dot={false}
							/>
							<Line
								type="monotone"
								dataKey="returningPlayers"
								name="Returning players"
								stroke="#e9a45b"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</article>
				<article className="panel wide">
					<div className="panel-heading">
						<h3>New identity retention</h3>
						<p>
							Exact-day return in any mode; only fully matured cohorts enter each
							sample.
						</p>
					</div>
					<ResponsiveContainer width="100%" height={280}>
						<BarChart data={retention} margin={{ left: -8, right: 12 }}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis dataKey="label" />
							<YAxis
								domain={[0, 1]}
								tickFormatter={(value) => percent.format(Number(value))}
							/>
							<Tooltip formatter={(value) => percent.format(Number(value))} />
							<Bar
								dataKey="rate"
								name="Retention"
								fill="var(--accent)"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
					<div className="retention-samples">
						{query.data.retention.map((row) => (
							<span key={row.day}>
								D{row.day}: {row.returnedPlayers} / {row.eligiblePlayers}
							</span>
						))}
					</div>
				</article>
			</section>
			<article className="panel table-panel">
				<div className="panel-heading">
					<h3>Identity type breakdown</h3>
					<p>Guest cleanup can reduce historical guest counts and retention samples.</p>
				</div>
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>Type</th>
								<th>Active</th>
								<th>New</th>
								<th>Returning</th>
								<th>Repeat</th>
								<th>Runs</th>
								<th>Runs / active</th>
							</tr>
						</thead>
						<tbody>
							{query.data.types.map((row) => (
								<PlayerTypeRow key={row.type} row={row} />
							))}
						</tbody>
					</table>
				</div>
			</article>
		</main>
	);
}

function PlayerTypeRow({ row }: { row: AdminPlayerTypeMetricsRow }) {
	return (
		<tr>
			<td>
				<strong>{row.type === "guest" ? "Guest" : "Registered"}</strong>
			</td>
			<td>{row.activePlayers}</td>
			<td>{row.newPlayers}</td>
			<td>{row.returningPlayers}</td>
			<td>{row.repeatPlayers}</td>
			<td>{row.runsStarted}</td>
			<td>{row.runsPerActivePlayer.toFixed(1)}</td>
		</tr>
	);
}
