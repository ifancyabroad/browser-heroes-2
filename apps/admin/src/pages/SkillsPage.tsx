import { SKILLS_BY_ID, type SkillId } from "@app/content";
import type { AdminSkillMetricsRow } from "@app/shared";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useOutletContext } from "react-router-dom";
import type { DashboardContext } from "../components/DashboardLayout";
import { QueryError, QueryLoading } from "../components/QueryState";
import { SortableHeader } from "../components/SortableHeader";
import { useSkillMetrics } from "../features/metrics";
import { SkillFilters } from "../features/metrics/components/SkillFilters";
import { defaultSkillMetricsFilters } from "../features/metrics/types";
import { useTableSort } from "../hooks/useTableSort";

type SortKey =
	| "uses"
	| "usageShare"
	| "runs"
	| "combats"
	| "averageUsesPerRun"
	| "averageBattle"
	| "averageTurn"
	| "combatWinRate";

const percent = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

export function SkillsPage() {
	const { filters } = useOutletContext<DashboardContext>();
	const [skillFilters, setSkillFilters] = useState(defaultSkillMetricsFilters);
	const [search, setSearch] = useState("");
	const query = useSkillMetrics(filters, skillFilters);
	const searchTerm = search.trim().toLocaleLowerCase();
	const skills = query.data?.skills ?? [];
	const tableRows = skills.filter((row) =>
		`${getSkillName(row.skillId)} ${row.skillId}`.toLocaleLowerCase().includes(searchTerm),
	);
	const sort = useTableSort<AdminSkillMetricsRow, SortKey>(tableRows, "uses");

	if (query.isPending) {
		return <QueryLoading />;
	}

	if (query.isError) {
		return <QueryError onRetry={() => void query.refetch()} />;
	}

	const rows = sort.rows;
	const chart = [...skills]
		.sort((a, b) => b.uses - a.uses)
		.slice(0, 12)
		.map((row) => ({ ...row, name: getSkillName(row.skillId) }));

	return (
		<main className="dashboard">
			<div className="page-title">
				<div>
					<h2>Skill performance</h2>
					<p>Successful skill uses recorded within the selected UTC dates.</p>
				</div>
				{query.isFetching ? <span className="refreshing">Refreshing…</span> : null}
			</div>
			<SkillFilters values={skillFilters} onChange={setSkillFilters} />
			{skills.length === 0 ? <SkillEmptyState /> : null}
			{skills.length > 0 ? (
				<article className="panel">
					<div className="panel-heading">
						<h3>Usage share</h3>
						<p>The twelve most frequently used skills.</p>
					</div>
					<ResponsiveContainer width="100%" height={380}>
						<BarChart data={chart} layout="vertical" margin={{ left: 55, right: 18 }}>
							<CartesianGrid strokeDasharray="3 3" horizontal={false} />
							<XAxis
								type="number"
								tickFormatter={(value) => percent.format(Number(value))}
							/>
							<YAxis type="category" dataKey="name" width={130} />
							<Tooltip
								formatter={(value, _name, item) => [
									percent.format(Number(value)),
									`Usage share (${item.payload.uses} uses)`,
								]}
							/>
							<Bar
								dataKey="usageShare"
								name="Usage share"
								fill="var(--accent)"
								radius={[0, 4, 4, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</article>
			) : null}
			{skills.length > 0 ? (
				<article className="panel table-panel">
					<div className="panel-heading table-panel-heading">
						<div>
							<h3>Skill details</h3>
							<p>
								Combat win rate includes combats resolved within the selected dates.
							</p>
						</div>
						<label className="table-search">
							<span>Search skills</span>
							<input
								type="search"
								value={search}
								placeholder="Skill name or ID"
								onChange={(event) => setSearch(event.target.value)}
							/>
						</label>
					</div>
					{rows.length === 0 ? <SkillTableEmptyState /> : null}
					{rows.length > 0 ? (
						<div className="table-wrap">
							<table>
								<thead>
									<tr>
										<th>Skill</th>
										<SortableHeader
											label="Uses"
											value="uses"
											{...sort.headerProps}
										/>
										<SortableHeader
											label="Share"
											value="usageShare"
											{...sort.headerProps}
										/>
										<SortableHeader
											label="Runs"
											value="runs"
											{...sort.headerProps}
										/>
										<SortableHeader
											label="Combats"
											value="combats"
											{...sort.headerProps}
										/>
										<SortableHeader
											label="Uses / run"
											value="averageUsesPerRun"
											{...sort.headerProps}
										/>
										<SortableHeader
											label="Avg. battle"
											value="averageBattle"
											{...sort.headerProps}
										/>
										<SortableHeader
											label="Avg. turn"
											value="averageTurn"
											{...sort.headerProps}
										/>
										<SortableHeader
											label="Combat win rate"
											value="combatWinRate"
											{...sort.headerProps}
										/>
									</tr>
								</thead>
								<tbody>
									{rows.map((row) => (
										<SkillRow key={row.skillId} row={row} />
									))}
								</tbody>
							</table>
						</div>
					) : null}
				</article>
			) : null}
		</main>
	);
}

function SkillTableEmptyState() {
	return (
		<div className="state table-empty-state">
			<h2>No skills match this search</h2>
			<p>Try another skill name or ID.</p>
		</div>
	);
}

function SkillEmptyState() {
	return (
		<div className="state">
			<h2>No skills match these filters</h2>
			<p>Choose another class, date range, or run mode.</p>
		</div>
	);
}

function SkillRow({ row }: { row: AdminSkillMetricsRow }) {
	const skillName = getSkillName(row.skillId);

	return (
		<tr>
			<td>
				<strong>{skillName}</strong>
				<small>{row.skillId}</small>
			</td>
			<td>{row.uses}</td>
			<td>{percent.format(row.usageShare)}</td>
			<td>{row.runs}</td>
			<td>{row.combats}</td>
			<td>{row.averageUsesPerRun.toFixed(1)}</td>
			<td>{row.averageBattle.toFixed(1)}</td>
			<td>{row.averageTurn.toFixed(1)}</td>
			<td>
				{percent.format(row.combatWinRate)}
				<small>{row.resolvedCombats} resolved</small>
			</td>
		</tr>
	);
}

function getSkillName(skillId: string): string {
	return SKILLS_BY_ID[skillId as SkillId]?.name ?? skillId;
}
