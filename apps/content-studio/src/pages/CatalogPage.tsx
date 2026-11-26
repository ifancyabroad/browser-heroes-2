import { Link, Navigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import { EntryCards } from "../components/EntryCards";
import { ContentImage } from "../components/ContentImage";
import { formatLabel, formatValue } from "../content/presentation";
import { catalogByKey, isCategoryKey, type Catalog, type CategoryKey } from "../content/catalog";
import {
	applyCatalogQuery,
	PAGE_SIZE,
	readCatalogQuery,
	writeCatalogQuery,
	type CatalogQuery,
} from "../content/query";

const previewColumns: Record<CategoryKey, readonly string[]> = {
	enemies: ["zone", "rank", "threat", "attack"],
	skills: ["pool", "rarity", "uses", "effects"],
	feats: ["kind", "category", "modifiers", "riders"],
	classes: ["hitDie", "pools", "skills", "equipment"],
	"system-ghosts": ["class", "encounterLevel", "heroLevel", "skills"],
	"item-bases": ["type", "subtype", "stat", "price"],
	affixes: ["position", "rarity", "appliesTo", "modifiers"],
	items: ["type", "stat", "modifiers", "riders"],
	achievements: ["order", "description"],
};

export function CatalogPage() {
	const { category } = useParams();
	const location = useLocation();
	const [params, setParams] = useSearchParams();
	if (!isCategoryKey(category)) {
		return <Navigate to="/enemies" replace />;
	}
	const catalog = catalogByKey[category];
	const query = readCatalogQuery(catalog, params);
	const results = applyCatalogQuery(catalog, query);
	const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
	const page = Math.min(query.page, pages);
	const firstVisibleIndex = (page - 1) * PAGE_SIZE;
	const visible = results.slice(firstVisibleIndex, page * PAGE_SIZE);
	const compactColumns = previewColumns[category].map(
		(key) => catalog.columns.find((column) => column.key === key)!,
	);
	const tableColumns = query.fullTable
		? catalog.columns.filter((column) => column.key !== "name")
		: compactColumns;
	const activeFilters = Object.values(query.filters).filter(Boolean).length;
	const advancedFilters = catalog.filters.slice(3);

	function update(changes: Partial<CatalogQuery>) {
		setParams(writeCatalogQuery({ ...query, ...changes }), { replace: true });
	}
	function setFilter(key: string, value: string) {
		update({ filters: { ...query.filters, [key]: value }, page: 1 });
	}
	function sort(key: string) {
		update({
			sort: key,
			direction: query.sort === key && query.direction === "asc" ? "desc" : "asc",
			page: 1,
		});
	}

	return (
		<section className="catalog-page" key={category}>
			<div className="page-heading">
				<div>
					<span className="eyebrow">Content library</span>
					<h2>{catalog.label}</h2>
					<p aria-live="polite">
						Showing {results.length ? firstVisibleIndex + 1 : 0}–
						{firstVisibleIndex + visible.length} of {results.length}{" "}
						{results.length === catalog.entries.length ? "entries" : "matching entries"}
						{results.length !== catalog.entries.length &&
							` (${catalog.entries.length} total)`}
					</p>
				</div>
				{catalog.hasImages && (
					<div className="segmented" role="group" aria-label="Display mode">
						<button
							className={query.mode === "table" ? "selected" : ""}
							aria-pressed={query.mode === "table"}
							onClick={() => update({ mode: "table", page: 1 })}
						>
							Table
						</button>
						<button
							className={query.mode === "images" ? "selected" : ""}
							aria-pressed={query.mode === "images"}
							onClick={() => update({ mode: "images", page: 1 })}
						>
							Images
						</button>
					</div>
				)}
			</div>
			<div className="filters panel">
				<div className="filter-primary">
					<label className="search">
						<span>Search {catalog.label.toLowerCase()}</span>
						<input
							type="search"
							value={query.search}
							onChange={(event) => update({ search: event.target.value, page: 1 })}
							placeholder="Name, ID, or content…"
						/>
					</label>
					{catalog.filters.slice(0, 3).map((filter) => (
						<Filter
							key={filter.key}
							filter={filter}
							value={query.filters[filter.key] ?? ""}
							onChange={setFilter}
						/>
					))}
					<button
						className="clear"
						disabled={!query.search && !activeFilters}
						onClick={() => update({ search: "", filters: {}, page: 1 })}
					>
						Clear filters
					</button>
				</div>
				{advancedFilters.length > 0 && (
					<details
						className="advanced-filters"
						key={`${category}-${advancedFilters.some((filter) => query.filters[filter.key])}`}
						open={
							advancedFilters.some((filter) => Boolean(query.filters[filter.key])) ||
							undefined
						}
					>
						<summary>
							More filters <span>{advancedFilters.length}</span>
							{activeFilters > 0 && (
								<span className="filter-count">{activeFilters} active</span>
							)}
						</summary>
						<div className="filter-secondary">
							{advancedFilters.map((filter) => (
								<Filter
									key={filter.key}
									filter={filter}
									value={query.filters[filter.key] ?? ""}
									onChange={setFilter}
								/>
							))}
						</div>
					</details>
				)}
			</div>
			<div className="catalog-toolbar">
				<div className="sort-controls">
					<label htmlFor="catalog-sort">Sort by</label>
					<select
						id="catalog-sort"
						value={query.sort}
						onChange={(event) => update({ sort: event.target.value, page: 1 })}
					>
						{catalog.columns.map((column) => (
							<option value={column.key} key={column.key}>
								{formatLabel(column.label)}
							</option>
						))}
					</select>
					<button
						aria-label={
							query.direction === "asc" ? "Sort descending" : "Sort ascending"
						}
						onClick={() =>
							update({
								direction: query.direction === "asc" ? "desc" : "asc",
								page: 1,
							})
						}
					>
						{query.direction === "asc" ? "↑ Asc" : "↓ Desc"}
					</button>
				</div>
				{query.mode === "table" && (
					<button
						className="column-toggle"
						aria-pressed={query.fullTable}
						onClick={() => update({ fullTable: !query.fullTable })}
					>
						{query.fullTable ? "Compact columns" : "All columns"}
					</button>
				)}
			</div>
			{!visible.length ? (
				<div className="empty">
					<h3>No matching content</h3>
					<p>Try another search or clear the filters to browse this category.</p>
				</div>
			) : query.mode === "images" ? (
				<EntryCards
					entries={visible}
					catalog={catalog}
					columns={compactColumns}
					catalogSearch={location.search}
					images
				/>
			) : (
				<>
					<div
						className="table-wrap"
						role="region"
						aria-label={`${catalog.label} comparison table`}
						tabIndex={0}
					>
						<table>
							<caption className="sr-only">
								{catalog.label}:{" "}
								{query.fullTable ? "all columns" : "compact comparison"}
							</caption>
							<thead>
								<tr>
									{[
										catalog.columns.find((column) => column.key === "name")!,
										...tableColumns,
									].map((column) => (
										<th
											key={column.key}
											className={column.numeric ? "numeric" : undefined}
											aria-sort={
												query.sort === column.key
													? query.direction === "asc"
														? "ascending"
														: "descending"
													: "none"
											}
										>
											<button
												className="sort"
												onClick={() => sort(column.key)}
											>
												{formatLabel(column.label)}
												{query.sort === column.key && (
													<span>
														{query.direction === "asc" ? " ↑" : " ↓"}
													</span>
												)}
											</button>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{visible.map((entry) => (
									<tr key={entry.id}>
										<td className="identity-cell">
											<Link
												className="entry-identity"
												aria-label={entry.name}
												to={`/${category}/${entry.id}`}
												state={{ catalogSearch: location.search }}
											>
												{entry.images[0] && (
													<ContentImage path={entry.images[0]} label="" />
												)}
												<span>
													<strong>{entry.name}</strong>
													<code>{entry.id}</code>
												</span>
											</Link>
										</td>
										{tableColumns.map((column) => (
											<td
												key={column.key}
												className={
													column.numeric ? "numeric" : "summary-cell"
												}
											>
												<Link
													to={`/${category}/${entry.id}`}
													state={{ catalogSearch: location.search }}
												>
													{entry.cells[column.key] === "" ? (
														<span className="muted">—</span>
													) : (
														formatValue(
															column.key,
															entry.cells[column.key],
														)
													)}
												</Link>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="mobile-catalog">
						<EntryCards
							entries={visible}
							catalog={catalog}
							columns={compactColumns}
							catalogSearch={location.search}
						/>
					</div>
				</>
			)}
			<div className="pagination">
				<span>
					Page {page} of {pages}
				</span>
				<div>
					<button disabled={page <= 1} onClick={() => update({ page: page - 1 })}>
						Previous
					</button>
					<button disabled={page >= pages} onClick={() => update({ page: page + 1 })}>
						Next
					</button>
				</div>
			</div>
		</section>
	);
}

function Filter({
	filter,
	value,
	onChange,
}: {
	filter: Catalog["filters"][number];
	value: string;
	onChange: (key: string, value: string) => void;
}) {
	return (
		<label>
			<span>{filter.label}</span>
			<select value={value} onChange={(event) => onChange(filter.key, event.target.value)}>
				<option value="">All</option>
				{filter.options.map((option) => (
					<option key={option} value={option}>
						{formatLabel(option)}
					</option>
				))}
			</select>
		</label>
	);
}
