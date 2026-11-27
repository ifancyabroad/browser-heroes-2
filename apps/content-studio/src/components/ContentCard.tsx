import { Link } from "react-router-dom";
import { catalogByKey } from "../content/catalog";
import type { EntryLink } from "../content/details";
import { ContentImage } from "./ContentImage";

export function ContentCard({
	link,
	showDescription = true,
}: {
	link: EntryLink;
	showDescription?: boolean;
}) {
	const catalog = catalogByKey[link.category];
	const entry = catalog.entries.find((entry) => entry.id === link.id);
	if (!entry) {
		return (
			<div className="content-card">
				<strong>{link.id}</strong>
				<span className="muted">Unresolved {catalog.singular.toLowerCase()} reference</span>
			</div>
		);
	}
	const description = showDescription
		? (entry.description ??
			[entry.cells.subtype, entry.cells.stat]
				.filter((value) => value && value !== "—")
				.join(" · "))
		: undefined;
	const context = [link.label, link.detail].filter(Boolean).join(" · ");
	return (
		<Link className="content-card" to={`/${link.category}/${link.id}`} aria-label={entry.name}>
			<div className="content-card-heading">
				{entry.images[0] && <ContentImage path={entry.images[0]} label="" />}
				<div className="content-card-identity">
					{context && <span className="content-card-context">{context}</span>}
					<strong>{entry.name}</strong>
					<code>{entry.id}</code>
				</div>
				<span aria-hidden="true">→</span>
			</div>
			{description && <p>{description}</p>}
		</Link>
	);
}
