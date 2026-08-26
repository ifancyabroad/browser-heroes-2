import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ContentImage } from "../components/ContentImage";
import { StructuredValue } from "../components/StructuredValue";
import { catalogByKey, isCategoryKey } from "../content/catalog";
import {
	getIncomingReferences,
	getOutgoingReferences,
	type ContentReference,
} from "../content/references";

export function DetailPage() {
	const { category, id } = useParams();
	const location = useLocation();
	if (!isCategoryKey(category)) {
		return <Navigate to="/enemies" replace />;
	}
	const catalog = catalogByKey[category];
	const entry = catalog.entries.find((candidate) => candidate.id === id);
	if (!entry) {
		return <NotFound label={catalog.singular} />;
	}
	const outgoing = getOutgoingReferences(category, entry);
	const incoming = getIncomingReferences(category, entry.id);
	const catalogSearch = readCatalogSearch(location.state);
	const definitionEntries = Object.entries(entry.definition).filter(
		([key]) =>
			![
				"id",
				"name",
				"description",
				"icon",
				"portrait",
				"enemyPortrait",
				"iconPool",
			].includes(key),
	);

	return (
		<article>
			<Link className="back-link" to={`/${category}${catalogSearch}`}>
				← Back to {catalog.label}
			</Link>
			<div className="detail-heading">
				<div>
					<span className="eyebrow">{catalog.singular}</span>
					<h2>{entry.name}</h2>
					<code>{entry.id}</code>
					{entry.description && <p>{entry.description}</p>}
				</div>
				{entry.images[0] && (
					<ContentImage path={entry.images[0]} label={entry.name} size="detail" />
				)}
			</div>
			{entry.images.length > 0 && (
				<section className="panel">
					<h3>Artwork</h3>
					<div className="artwork-grid">
						{entry.images.map((path, index) => (
							<figure key={`${path}-${index}`}>
								<ContentImage
									path={path}
									label={`${entry.name} ${index + 1}`}
									size="detail"
								/>
								<figcaption>{path}</figcaption>
							</figure>
						))}
					</div>
				</section>
			)}
			<div className="detail-grid">
				<section className="panel">
					<h3>Definition</h3>
					<dl className="definition-list">
						{definitionEntries.map(([key, value]) => (
							<div className="field-row" key={key}>
								<dt>{formatLabel(key)}</dt>
								<dd>
									<StructuredValue value={value} />
								</dd>
							</div>
						))}
					</dl>
				</section>
				<aside>
					<ReferencePanel
						title="References"
						empty="No outgoing references."
						references={outgoing}
					/>
					<ReferencePanel
						title="Referenced by"
						empty="No incoming references."
						references={incoming}
					/>
				</aside>
			</div>
			<details className="raw">
				<summary>Registry data</summary>
				<p>This is the parsed registry value, not source code.</p>
				<pre>{JSON.stringify(entry.definition, null, 2)}</pre>
			</details>
		</article>
	);
}

function ReferencePanel({
	title,
	empty,
	references,
}: {
	title: string;
	empty: string;
	references: readonly ContentReference[];
}) {
	return (
		<section className="panel references">
			<h3>{title}</h3>
			{references.length === 0 ? (
				<p className="muted">{empty}</p>
			) : (
				<ul>
					{references.map((reference) => (
						<li key={`${reference.category}:${reference.id}`}>
							<span>{reference.relation}</span>
							<Link to={`/${reference.category}/${reference.id}`}>
								{reference.name}
								<code>{reference.id}</code>
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

function NotFound({ label }: { label: string }) {
	return (
		<div className="empty">
			<h2>{label} not found</h2>
			<p>The requested registry ID does not exist.</p>
		</div>
	);
}

function formatLabel(value: string) {
	return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function readCatalogSearch(state: unknown) {
	if (typeof state !== "object" || state === null || !("catalogSearch" in state)) {
		return "";
	}
	return typeof state.catalogSearch === "string" && state.catalogSearch.startsWith("?")
		? state.catalogSearch
		: "";
}
