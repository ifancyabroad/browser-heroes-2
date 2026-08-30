import { useOutletContext } from "react-router-dom";
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
import type { DashboardContext } from "../components/DashboardLayout";
import { EmptyState, QueryError, QueryLoading } from "../components/QueryState";
import { Stat } from "../components/Stat";
import { shortDate } from "../lib/dates";

const number = new Intl.NumberFormat("en-GB");
const percent = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

export function OverviewPage() {
	const { overview } = useOutletContext<DashboardContext>();
	if (overview.isPending) {
		return <QueryLoading />;
	}
	if (overview.isError) {
		return <QueryError onRetry={() => void overview.refetch()} />;
	}
	const data = overview.data;
	if (data.runs.started === 0 && data.players.active.total === 0) {
		return <EmptyState />;
	}

	const outcomes = Object.entries(data.runs.outcomes).map(([name, value]) => ({ name, value }));
	return (
		<main className="dashboard">
			<div className="page-title">
				<div>
					<h2>Overview</h2>
					<p>Player activity and run health across the selected UTC dates.</p>
				</div>
				{overview.isFetching ? <span className="refreshing">Refreshing…</span> : null}
			</div>
			<section className="stat-grid">
				<Stat
					label="Active players"
					value={number.format(data.players.active.total)}
					detail={`${data.players.active.guests} guests · ${data.players.active.registered} registered`}
				/>
				<Stat
					label="New identities"
					value={number.format(data.players.new.total)}
					detail={`${data.players.new.guests} guests · ${data.players.new.registered} registered`}
				/>
				<Stat
					label="Runs started"
					value={number.format(data.runs.started)}
					detail={`${data.runs.outcomes.active} still active`}
				/>
				<Stat
					label="Final boss completion"
					value={percent.format(data.runs.finalBossCompletionRate)}
					detail={`${data.runs.finalBossCompletions} runs defeated battle 100`}
				/>
			</section>
			<section className="chart-grid">
				<Panel
					title="Activity trend"
					subtitle="Distinct active identities and run starts per UTC date"
					wide
				>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart
							data={data.daily}
							margin={{ top: 8, right: 12, bottom: 0, left: -18 }}
						>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis dataKey="date" tickFormatter={shortDate} minTickGap={28} />
							<YAxis allowDecimals={false} />
							<Tooltip labelFormatter={(value) => String(value)} />
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
								dataKey="runsStarted"
								name="Runs started"
								stroke="var(--violet)"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</Panel>
				<Panel
					title="Current outcomes"
					subtitle="Latest status of runs started in the range"
				>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart
							data={outcomes}
							margin={{ top: 8, right: 8, bottom: 0, left: -18 }}
						>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis
								dataKey="name"
								tickFormatter={(value) =>
									String(value).replace(/^./, (letter) => letter.toUpperCase())
								}
							/>
							<YAxis allowDecimals={false} />
							<Tooltip cursor={{ fill: "rgba(255,255,255,.04)" }} />
							<Bar
								dataKey="value"
								name="Runs"
								fill="var(--accent)"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</Panel>
				<Panel title="Progression" subtitle="Share of the run cohort reaching each battle">
					<ResponsiveContainer width="100%" height={300}>
						<BarChart
							data={data.progression}
							margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
						>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis
								dataKey="battle"
								label={{
									value: "Battle reached",
									position: "insideBottom",
									offset: -2,
								}}
							/>
							<YAxis
								tickFormatter={(value) => `${Math.round(Number(value) * 100)}%`}
								domain={[0, 1]}
							/>
							<Tooltip
								formatter={(value, _name, item) => [
									percent.format(Number(value)),
									`Runs reaching battle (${item.payload.runs})`,
								]}
							/>
							<Bar
								dataKey="percentage"
								name="Runs reaching battle"
								fill="var(--success)"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</Panel>
			</section>
		</main>
	);
}

function Panel(props: {
	title: string;
	subtitle: string;
	wide?: boolean;
	children: React.ReactNode;
}) {
	return (
		<article className={`panel ${props.wide ? "wide" : ""}`}>
			<div className="panel-heading">
				<h3>{props.title}</h3>
				<p>{props.subtitle}</p>
			</div>
			{props.children}
		</article>
	);
}
