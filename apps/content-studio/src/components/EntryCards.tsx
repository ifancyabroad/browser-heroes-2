import { Link } from "react-router-dom";
import { ContentImage } from "./ContentImage";
import { formatLabel, formatValue } from "../content/presentation";
import type { Catalog, CatalogColumn, CatalogEntry } from "../content/catalog";

export function EntryCards({
	entries,
	catalog,
	columns,
	catalogSearch,
	images = false,
}: {
	entries: readonly CatalogEntry[];
	catalog: Catalog;
	columns: readonly CatalogColumn[];
	catalogSearch: string;
	images?: boolean;
}) {
	return (
		<div className={images ? "image-grid" : "entry-grid"}>
			{entries.map((entry) => (
				<Link
					className="gallery-card"
					aria-label={entry.name}
					to={`/${catalog.key}/${entry.id}`}
					state={{ catalogSearch }}
					key={entry.id}
				>
					{images && (
						<div className="card-images">
							{entry.images.slice(0, 4).map((path, index) => (
								<ContentImage
									key={`${path}-${index}`}
									path={path}
									label={`${entry.name} ${index + 1}`}
									size="card"
								/>
							))}
							{entry.images.length > 4 && (
								<span className="image-count">+{entry.images.length - 4} more</span>
							)}
						</div>
					)}
					<div className="card-title">
						<strong>{entry.name}</strong>
						<code>{entry.id}</code>
					</div>
					{entry.description && <p className="card-description">{entry.description}</p>}
					<dl className="card-facts">
						{columns.slice(0, images ? 2 : 4).map((column) => (
							<div key={column.key}>
								<dt>{formatLabel(column.label)}</dt>
								<dd>
									{entry.cells[column.key] === ""
										? "—"
										: formatValue(column.key, entry.cells[column.key])}
								</dd>
							</div>
						))}
					</dl>
					<span className="card-open">Inspect {catalog.singular.toLowerCase()} →</span>
				</Link>
			))}
		</div>
	);
}
