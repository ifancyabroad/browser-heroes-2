import { CLASSES_BY_ID } from "@app/content";
import type { AdminClassMetricsRow } from "@app/shared";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useOutletContext } from "react-router-dom";
import type { DashboardContext } from "../components/DashboardLayout";
import { EmptyState, QueryError, QueryLoading } from "../components/QueryState";
import { useClassMetrics } from "../features/metrics";

type SortKey =
	| "runsStarted"
	| "pickRate"
	| "averageBattleReached"
	| "deathRate"
	| "finalBossCompletionRate";
const percent = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

export function ClassesPage() {
	const { filters } = useOutletContext<DashboardContext>();
	const query = useClassMetrics(filters);
	const [sort, setSort] = useState<SortKey>("runsStarted");
	if (query.isPending) {
		return <QueryLoading />;
	}
	if (query.isError) {
		return <QueryError onRetry={() => void query.refetch()} />;
	}
	if (!query.data.classes.some((row) => row.runsStarted)) {
		return <EmptyState />;
	}

	const rows = [...query.data.classes].sort((a, b) => b[sort] - a[sort]);
	const chart = rows.map((row) => ({ ...row, name: CLASSES_BY_ID[row.classId].name }));
	return (
		<main className="dashboard">
			<div className="page-title">
				<div>
					<h2>Class performance</h2>
					<p>
						Popularity, progression, and outcomes for runs started in the selected
						range.
					</p>
				</div>
				{query.isFetching ? <span className="refreshing">Refreshing…</span> : null}
			</div>
			<article className="panel">
				<div className="panel-heading">
					<h3>Average battle reached</h3>
					<p>Sample size is shown in the table below.</p>
				</div>
				<ResponsiveContainer width="100%" height={340}>
					<BarChart data={chart} layout="vertical" margin={{ left: 18, right: 18 }}>
						<CartesianGrid strokeDasharray="3 3" horizontal={false} />
						<XAxis type="number" />
						<YAxis type="category" dataKey="name" width={94} />
						<Tooltip formatter={(value) => Number(value).toFixed(1)} />
						<Bar
							dataKey="averageBattleReached"
							name="Average battle"
							fill="var(--accent)"
							radius={[0, 4, 4, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</article>
			<article className="panel table-panel">
				<div className="panel-heading">
					<h3>Class details</h3>
					<p>Click a column heading to sort descending.</p>
				</div>
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>Class</th>
								<Sort
									label="Runs"
									value="runsStarted"
									active={sort}
									set={setSort}
								/>
								<Sort
									label="Pick rate"
									value="pickRate"
									active={sort}
									set={setSort}
								/>
								<Sort
									label="Avg. battle"
									value="averageBattleReached"
									active={sort}
									set={setSort}
								/>
								<th>Avg. kills</th>
								<Sort
									label="Death rate"
									value="deathRate"
									active={sort}
									set={setSort}
								/>
								<Sort
									label="Boss completion"
									value="finalBossCompletionRate"
									active={sort}
									set={setSort}
								/>
							</tr>
						</thead>
						<tbody>
							{rows.map((row) => (
								<ClassRow key={row.classId} row={row} />
							))}
						</tbody>
					</table>
				</div>
			</article>
		</main>
	);
}

function Sort(props: {
	label: string;
	value: SortKey;
	active: SortKey;
	set: (value: SortKey) => void;
}) {
	return (
		<th aria-sort={props.active === props.value ? "descending" : "none"}>
			<button
				className={props.active === props.value ? "table-sort active" : "table-sort"}
				onClick={() => props.set(props.value)}
			>
				{props.label}
			</button>
		</th>
	);
}

function ClassRow({ row }: { row: AdminClassMetricsRow }) {
	const className = CLASSES_BY_ID[row.classId].name;

	return (
		<tr>
			<td>
				<strong>{className}</strong>
				<small>{row.classId}</small>
			</td>
			<td>{row.runsStarted}</td>
			<td>{percent.format(row.pickRate)}</td>
			<td>{row.averageBattleReached.toFixed(1)}</td>
			<td>{row.averageKills.toFixed(1)}</td>
			<td>
				{percent.format(row.deathRate)}
				<small>{row.terminalRuns} terminal</small>
			</td>
			<td>
				{percent.format(row.finalBossCompletionRate)}
				<small>{row.finalBossCompletions} completed</small>
			</td>
		</tr>
	);
}
