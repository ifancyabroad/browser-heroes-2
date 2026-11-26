import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ContentImage } from "../components/ContentImage";
import { StructuredValue } from "../components/StructuredValue";
import { DetailFacts, DetailSectionView } from "../components/DetailSections";
import { getDetailPresentation } from "../content/details";
import { catalogByKey, isCategoryKey } from "../content/catalog";
import { getIncomingReferences, type ContentReference } from "../content/references";

export function DetailPage() {
	const { category, id } = useParams();
	const location = useLocation();
	if (!isCategoryKey(category)) {
		return <Navigate to="/enemies" replace />;
	}
	const catalog = catalogByKey[category];
	const entry = catalog.entries.find((candidate) => candidate.id === id);
	if (!entry) {
		return (
			<div className="empty">
				<h2>{catalog.singular} not found</h2>
				<p>The requested registry ID does not exist.</p>
				<Link to={`/${category}`}>Browse {catalog.label}</Link>
			</div>
		);
	}
	const incoming = getIncomingReferences(category, entry.id);
	const presentation = getDetailPresentation(category, entry);
	const navigation = [
		{ id: "overview", title: "Summary" },
		...presentation.sections,
		...(presentation.additional.length > 0
			? [{ id: "additional", title: "Additional properties" }]
			: []),
		...(incoming.length > 0 ? [{ id: "references", title: "Referenced by" }] : []),
		...(entry.images.length > 0 ? [{ id: "artwork", title: "Artwork" }] : []),
		{ id: "registry", title: "Registry data" },
	];

	return (
		<article className="detail-page" key={`${category}/${id}`}>
			<Link className="back-link" to={`/${category}${readCatalogSearch(location.state)}`}>
				← Back to {catalog.label}
			</Link>
			<header className="detail-heading" id="overview">
				<div className="detail-identity">
					{entry.images[0] && (
						<ContentImage
							key={entry.images[0]}
							path={entry.images[0]}
							label={entry.name}
							size="detail"
						/>
					)}
					<div>
						<span className="eyebrow">{catalog.singular}</span>
						<div className="entry-title">
							<h2>{entry.name}</h2>
							{presentation.badges.length > 0 && (
								<ul className="entry-badges" aria-label="Classification">
									{presentation.badges.map((badge) => (
										<li key={badge}>{badge}</li>
									))}
								</ul>
							)}
						</div>
						<code>{entry.id}</code>
					</div>
				</div>
				{entry.description && (
					<div className="entry-description">
						{presentation.descriptionLabel && <h3>{presentation.descriptionLabel}</h3>}
						<p>{entry.description}</p>
					</div>
				)}
				{presentation.summary.length > 0 && (
					<DetailFacts facts={presentation.summary} summary />
				)}
			</header>
			<nav className="section-nav" aria-label="Entry sections">
				{navigation.map((section) => (
					<a key={section.id} href={`#${section.id}`}>
						{section.title}
					</a>
				))}
			</nav>
			<select
				className="entry-section-picker"
				aria-label="Jump to section"
				value=""
				onChange={(event) => {
					window.location.hash = event.target.value;
				}}
			>
				<option value="" disabled>
					Jump to section
				</option>
				{navigation.map((section) => (
					<option key={section.id} value={section.id}>
						{section.title}
					</option>
				))}
			</select>
			<div className="detail-sections">
				{presentation.sections.map((section) => (
					<DetailSectionView key={section.id} section={section} />
				))}
			</div>
			{presentation.additional.length > 0 && (
				<details className="panel disclosure" id="additional">
					<summary>Additional properties</summary>
					<div className="additional-properties">
						<StructuredValue value={Object.fromEntries(presentation.additional)} />
					</div>
				</details>
			)}
			{incoming.length > 0 && (
				<div className="incoming-references" id="references">
					<IncomingReferences references={incoming} />
				</div>
			)}
			{entry.images.length > 0 && (
				<details className="panel disclosure" id="artwork">
					<summary>
						Artwork{" "}
						<span>
							{entry.images.length} {entry.images.length === 1 ? "image" : "images"}
						</span>
					</summary>
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
				</details>
			)}
			<details className="panel disclosure raw" id="registry">
				<summary>
					Registry data <span>Complete definition</span>
				</summary>
				<p>This is the parsed registry value, not source code.</p>
				<pre>{JSON.stringify(entry.definition, null, 2)}</pre>
			</details>
		</article>
	);
}

function IncomingReferences({ references }: { references: readonly ContentReference[] }) {
	return (
		<section className="panel references" aria-label="Referenced by">
			<div className="section-heading">
				<h3>Referenced by</h3>
				<span className="section-note">{references.length}</span>
			</div>
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
		</section>
	);
}

function readCatalogSearch(state: unknown) {
	if (typeof state !== "object" || state === null || !("catalogSearch" in state)) {
		return "";
	}
	return typeof state.catalogSearch === "string" && state.catalogSearch.startsWith("?")
		? state.catalogSearch
		: "";
}
