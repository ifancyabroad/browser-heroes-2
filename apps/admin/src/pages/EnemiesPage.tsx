import { ENEMIES_BY_ID, type EnemyId } from "@app/content";
import type { AdminEnemyMetricsRow } from "@app/shared";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useOutletContext } from "react-router-dom";
import type { DashboardContext } from "../components/DashboardLayout";
import { EmptyState, QueryError, QueryLoading } from "../components/QueryState";
import { useEnemyMetrics } from "../features/metrics";

type SortKey = "combats" | "winRate" | "averageTurns";
const percent = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

export function EnemiesPage() {
	const { filters } = useOutletContext<DashboardContext>();
	const query = useEnemyMetrics(filters);
	const [sort, setSort] = useState<SortKey>("combats");

	if (query.isPending) {
		return <QueryLoading />;
	}

	if (query.isError) {
		return <QueryError onRetry={() => void query.refetch()} />;
	}

	if (query.data.enemies.length === 0) {
		return <EmptyState />;
	}

	const rows = [...query.data.enemies].sort((a, b) => b[sort] - a[sort]);
	const chart = [...query.data.enemies]
		.sort((a, b) => b.combats - a.combats)
		.slice(0, 12)
		.map((row) => ({ ...row, name: getEnemyName(row) }));

	return (
		<main className="dashboard">
			<div className="page-title">
				<div>
					<h2>Enemy performance</h2>
					<p>Player outcomes for combats resolved within the selected UTC dates.</p>
				</div>
				{query.isFetching ? <span className="refreshing">Refreshing…</span> : null}
			</div>
			<article className="panel">
				<div className="panel-heading">
					<h3>Player win rate</h3>
					<p>The twelve most frequently encountered enemies.</p>
				</div>
				<ResponsiveContainer width="100%" height={380}>
					<BarChart data={chart} layout="vertical" margin={{ left: 55, right: 18 }}>
						<CartesianGrid strokeDasharray="3 3" horizontal={false} />
						<XAxis
							type="number"
							domain={[0, 1]}
							tickFormatter={(value) => percent.format(Number(value))}
						/>
						<YAxis type="category" dataKey="name" width={130} />
						<Tooltip formatter={(value) => percent.format(Number(value))} />
						<Bar
							dataKey="winRate"
							name="Player win rate"
							fill="var(--success)"
							radius={[0, 4, 4, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</article>
			<article className="panel table-panel">
				<div className="panel-heading">
					<h3>Enemy details</h3>
					<p>Rates use resolved combats as their sample.</p>
				</div>
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>Enemy</th>
								<th>Type</th>
								<Sort label="Combats" value="combats" active={sort} set={setSort} />
								<th>Victories</th>
								<th>Defeats</th>
								<Sort
									label="Win rate"
									value="winRate"
									active={sort}
									set={setSort}
								/>
								<Sort
									label="Avg. turns"
									value="averageTurns"
									active={sort}
									set={setSort}
								/>
							</tr>
						</thead>
						<tbody>
							{rows.map((row) => (
								<EnemyRow key={`${row.encounterType}:${row.enemyId}`} row={row} />
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

function EnemyRow({ row }: { row: AdminEnemyMetricsRow }) {
	const enemyName = getEnemyName(row);

	return (
		<tr>
			<td>
				<strong>{enemyName}</strong>
				<small>{row.enemyId}</small>
			</td>
			<td>{row.encounterType}</td>
			<td>{row.combats}</td>
			<td>{row.victories}</td>
			<td>{row.defeats}</td>
			<td>
				{percent.format(row.winRate)}
				<small>{row.combats} resolved</small>
			</td>
			<td>{row.averageTurns.toFixed(1)}</td>
		</tr>
	);
}

function getEnemyName(row: AdminEnemyMetricsRow): string {
	if (row.encounterType === "ghost") {
		return "Ghost encounters";
	}

	return ENEMIES_BY_ID[row.enemyId as EnemyId]?.name ?? row.enemyId;
}
