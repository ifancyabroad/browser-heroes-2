import { ENEMIES_BY_ID, type EnemyId } from "@app/content";
import type { AdminEnemyMetricsRow } from "@app/shared";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useOutletContext } from "react-router-dom";
import type { DashboardContext } from "../components/DashboardLayout";
import { QueryError, QueryLoading } from "../components/QueryState";
import { SortableHeader } from "../components/SortableHeader";
import { useEnemyMetrics } from "../features/metrics";
import { EnemyFilters } from "../features/metrics/components/EnemyFilters";
import { defaultEnemyMetricsFilters } from "../features/metrics/types";
import { useTableSort } from "../hooks/useTableSort";

type SortKey = "combats" | "victories" | "defeats" | "winRate" | "averageTurns";
const percent = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });
export function EnemiesPage() {
	const { filters } = useOutletContext<DashboardContext>();
	const [enemyFilters, setEnemyFilters] = useState(defaultEnemyMetricsFilters);
	const [search, setSearch] = useState("");
	const query = useEnemyMetrics(filters, enemyFilters);
	const searchTerm = search.trim().toLocaleLowerCase();
	const enemies = query.data?.enemies ?? [];
	const tableRows = enemies.filter((row) =>
		`${getEnemyName(row)} ${row.enemyId}`.toLocaleLowerCase().includes(searchTerm),
	);
	const sort = useTableSort<AdminEnemyMetricsRow, SortKey>(tableRows, "combats");

	if (query.isPending) {
		return <QueryLoading />;
	}

	if (query.isError) {
		return <QueryError onRetry={() => void query.refetch()} />;
	}

	const rows = sort.rows;
	const chart = [...enemies]
		.map((row) => ({
			...row,
			name: getEnemyName(row),
			defeatRate: row.combats ? row.defeats / row.combats : 0,
		}))
		.sort((a, b) => b.defeatRate - a.defeatRate || b.combats - a.combats)
		.slice(0, 12);

	return (
		<main className="dashboard">
			<div className="page-title">
				<div>
					<h2>Enemy performance</h2>
					<p>Player outcomes for combats resolved within the selected UTC dates.</p>
				</div>
				{query.isFetching ? <span className="refreshing">Refreshing…</span> : null}
			</div>
			<EnemyFilters values={enemyFilters} onChange={setEnemyFilters} />
			{enemies.length === 0 ? <EnemyEmptyState /> : null}
			{enemies.length > 0 ? (
				<>
					<article className="panel">
						<div className="panel-heading">
							<h3>Most dangerous enemies</h3>
							<p>The twelve highest player defeat rates in this population.</p>
						</div>
						<ResponsiveContainer width="100%" height={380}>
							<BarChart
								data={chart}
								layout="vertical"
								margin={{ left: 55, right: 18 }}
							>
								<CartesianGrid strokeDasharray="3 3" horizontal={false} />
								<XAxis
									type="number"
									domain={[0, 1]}
									tickFormatter={(value) => percent.format(Number(value))}
								/>
								<YAxis type="category" dataKey="name" width={130} />
								<Tooltip
									formatter={(value, _name, item) => [
										percent.format(Number(value)),
										`Player defeat rate (${item.payload.combats} combats)`,
									]}
								/>
								<Bar
									dataKey="defeatRate"
									name="Player defeat rate"
									fill="var(--danger)"
									radius={[0, 4, 4, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</article>
					<article className="panel table-panel">
						<div className="panel-heading table-panel-heading">
							<div>
								<h3>Enemy details</h3>
								<p>
									Rates use resolved combats as their sample. Click headings to
									reverse sorting.
								</p>
							</div>
							<label className="table-search">
								<span>Search enemies</span>
								<input
									type="search"
									value={search}
									placeholder="Enemy name or ID"
									onChange={(event) => setSearch(event.target.value)}
								/>
							</label>
						</div>
						{rows.length === 0 ? <EnemyTableEmptyState /> : null}
						{rows.length > 0 ? (
							<div className="table-wrap">
								<table>
									<thead>
										<tr>
											<th>Enemy</th>
											<th>Type</th>
											<SortableHeader
												label="Combats"
												value="combats"
												{...sort.headerProps}
											/>
											<SortableHeader
												label="Victories"
												value="victories"
												{...sort.headerProps}
											/>
											<SortableHeader
												label="Defeats"
												value="defeats"
												{...sort.headerProps}
											/>
											<SortableHeader
												label="Win rate"
												value="winRate"
												{...sort.headerProps}
											/>
											<SortableHeader
												label="Avg. turns"
												value="averageTurns"
												{...sort.headerProps}
											/>
										</tr>
									</thead>
									<tbody>
										{rows.map((row) => (
											<EnemyRow
												key={`${row.encounterType}:${row.enemyId}`}
												row={row}
											/>
										))}
									</tbody>
								</table>
							</div>
						) : null}
					</article>
				</>
			) : null}
		</main>
	);
}

function EnemyEmptyState() {
	return (
		<div className="state">
			<h2>No enemies match these filters</h2>
			<p>Adjust the enemy search or filters to include more combats.</p>
		</div>
	);
}

function EnemyTableEmptyState() {
	return (
		<div className="state table-empty-state">
			<h2>No enemies match this search</h2>
			<p>Try another enemy name or ID.</p>
		</div>
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
