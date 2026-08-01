import type { Catalog, CatalogEntry } from "./catalog";

export type SortDirection = "asc" | "desc";
export type DisplayMode = "table" | "images";

export type CatalogQuery = {
	search: string;
	sort: string;
	direction: SortDirection;
	page: number;
	mode: DisplayMode;
	filters: Readonly<Record<string, string>>;
};

export const PAGE_SIZE = 30;

export function readCatalogQuery(catalog: Catalog, params: URLSearchParams): CatalogQuery {
	const requestedSort = params.get("sort") ?? catalog.defaultSort;
	const sort = catalog.columns.some((column) => column.key === requestedSort)
		? requestedSort
		: catalog.defaultSort;
	const parsedPage = Number(params.get("page") ?? 1);
	const filters = Object.fromEntries(
		catalog.filters
			.map((filter) => [filter.key, params.get(filter.key) ?? ""] as const)
			.filter(([, value]) => value !== ""),
	);

	return {
		search: params.get("q") ?? "",
		sort,
		direction: params.get("dir") === "desc" ? "desc" : "asc",
		page: Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,
		mode: catalog.hasImages && params.get("view") === "images" ? "images" : "table",
		filters,
	};
}

export function writeCatalogQuery(query: CatalogQuery) {
	const params = new URLSearchParams();
	if (query.search) {
		params.set("q", query.search);
	}
	if (query.sort) {
		params.set("sort", query.sort);
	}
	if (query.direction === "desc") {
		params.set("dir", "desc");
	}
	if (query.page > 1) {
		params.set("page", String(query.page));
	}
	if (query.mode === "images") {
		params.set("view", "images");
	}
	for (const [key, value] of Object.entries(query.filters)) {
		if (value) {
			params.set(key, value);
		}
	}
	return params;
}

export function applyCatalogQuery(catalog: Catalog, query: CatalogQuery) {
	const search = query.search.trim().toLocaleLowerCase();
	const filtered = catalog.entries.filter((entry) => {
		if (search && !entry.searchText.includes(search)) {
			return false;
		}
		return Object.entries(query.filters).every(([key, value]) =>
			entry.facets[key]?.includes(value),
		);
	});

	return [...filtered].sort((left, right) => {
		const comparison = compare(left, right, query.sort);
		return query.direction === "asc" ? comparison : -comparison;
	});
}

function compare(left: CatalogEntry, right: CatalogEntry, key: string) {
	const leftValue = left.cells[key] ?? "";
	const rightValue = right.cells[key] ?? "";
	if (typeof leftValue === "number" && typeof rightValue === "number") {
		return leftValue - rightValue || left.id.localeCompare(right.id);
	}
	return (
		String(leftValue).localeCompare(String(rightValue), "en", { numeric: true }) ||
		left.id.localeCompare(right.id)
	);
}
