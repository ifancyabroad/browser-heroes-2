import { Link, Navigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import { ContentImage, ImageStrip } from "../components/ContentImage";
import { catalogByKey, isCategoryKey, type CatalogEntry } from "../content/catalog";
import {
	applyCatalogQuery,
	PAGE_SIZE,
	readCatalogQuery,
	writeCatalogQuery,
	type CatalogQuery,
} from "../content/query";

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
	const detailState = { catalogSearch: location.search };
	const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
	const page = Math.min(query.page, pages);
	const firstVisibleIndex = (page - 1) * PAGE_SIZE;
	const visible = results.slice(firstVisibleIndex, page * PAGE_SIZE);
	const firstVisibleNumber = results.length === 0 ? 0 : firstVisibleIndex + 1;
	const lastVisibleNumber = firstVisibleIndex + visible.length;

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
		<section>
			<div className="page-heading">
				<div>
					<span className="eyebrow">Content registry</span>
					<h2>{catalog.label}</h2>
					<p>
						Showing {firstVisibleNumber}–{lastVisibleNumber} of {results.length}{" "}
						{results.length === catalog.entries.length ? "entries" : "matching entries"}
						{results.length !== catalog.entries.length &&
							` (${catalog.entries.length} total)`}
					</p>
				</div>
				{catalog.hasImages && (
					<div className="segmented" aria-label="Display mode">
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
			<div className="filters">
				<label className="search">
					<span>Search</span>
					<input
						value={query.search}
						onChange={(event) => update({ search: event.target.value, page: 1 })}
						placeholder={`Search ${catalog.label.toLocaleLowerCase()}…`}
					/>
				</label>
				{catalog.filters.map((filter) => (
					<label key={filter.key}>
						<span>{filter.label}</span>
						<select
							value={query.filters[filter.key] ?? ""}
							onChange={(event) => setFilter(filter.key, event.target.value)}
						>
							<option value="">All</option>
							{filter.options.map((option) => (
								<option key={option}>{option}</option>
							))}
						</select>
					</label>
				))}
				<button
					className="clear"
					disabled={!query.search && Object.keys(query.filters).length === 0}
					onClick={() => update({ search: "", filters: {}, page: 1 })}
				>
					Clear filters
				</button>
			</div>
			{visible.length === 0 ? (
				<div className="empty">No content matches these filters.</div>
			) : query.mode === "images" ? (
				<ImageGrid entries={visible} category={category} catalogSearch={location.search} />
			) : (
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								{catalog.hasImages && <th className="art-column">Art</th>}
								{catalog.columns.map((column) => (
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
										<button className="sort" onClick={() => sort(column.key)}>
											{column.label}
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
									{catalog.hasImages && (
										<td>
											<Link
												to={`/${category}/${entry.id}`}
												className="art-link"
												state={detailState}
											>
												{entry.images.length > 1 ? (
													<ImageStrip
														paths={entry.images}
														label={entry.name}
													/>
												) : entry.images[0] ? (
													<ContentImage
														path={entry.images[0]}
														label={entry.name}
													/>
												) : (
													<span className="no-art">—</span>
												)}
											</Link>
										</td>
									)}
									{catalog.columns.map((column) => (
										<td
											key={column.key}
											className={
												[
													column.numeric ? "numeric" : "",
													column.key === "modifiers" ||
													column.key === "riders"
														? "summary-cell"
														: "",
												]
													.filter(Boolean)
													.join(" ") || undefined
											}
											title={
												column.key === "modifiers" ||
												column.key === "riders"
													? String(entry.cells[column.key] ?? "")
													: undefined
											}
										>
											<Link
												to={`/${category}/${entry.id}`}
												state={detailState}
											>
												{entry.cells[column.key] ?? (
													<span className="muted">—</span>
												)}
											</Link>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
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

function ImageGrid({
	entries,
	category,
	catalogSearch,
}: {
	entries: readonly CatalogEntry[];
	category: string;
	catalogSearch: string;
}) {
	return (
		<div className="image-grid">
			{entries.map((entry) => (
				<Link
					className="gallery-card"
					to={`/${category}/${entry.id}`}
					state={{ catalogSearch }}
					key={entry.id}
				>
					<div className="card-images">
						{entry.images.slice(0, 6).map((path, index) => (
							<ContentImage
								key={`${path}-${index}`}
								path={path}
								label={`${entry.name} ${index + 1}`}
								size="card"
							/>
						))}
					</div>
					<strong>{entry.name}</strong>
					<code>{entry.id}</code>
					{entry.images.length > 6 && (
						<span className="image-count">+{entry.images.length - 6} more</span>
					)}
				</Link>
			))}
		</div>
	);
}
