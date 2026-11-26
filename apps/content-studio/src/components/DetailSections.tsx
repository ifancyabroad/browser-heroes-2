import { attributes } from "@app/content";
import { Link } from "react-router-dom";
import { catalogByKey } from "../content/catalog";
import type { DetailFact, DetailSection, EntryLink } from "../content/details";
import { formatLabel } from "../content/presentation";
import { ContentImage } from "./ContentImage";
import { RiderFlow } from "./EffectFlow";
import { StructuredValue } from "./StructuredValue";

export function DetailFacts({
	facts,
	summary = false,
}: {
	facts: readonly DetailFact[];
	summary?: boolean;
}) {
	return (
		<dl className={summary ? "detail-summary" : "profile-facts"}>
			{facts.map(({ label, value }) => (
				<div
					key={label}
					className={
						!summary && Array.isArray(value)
							? value.length > 6
								? "wide-fact"
								: "list-fact"
							: undefined
					}
				>
					<dt>{label}</dt>
					<dd>
						{Array.isArray(value) ? (
							summary ? (
								value.join(", ")
							) : (
								<ul className="value-chips">
									{value.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							)
						) : (
							value
						)}
					</dd>
				</div>
			))}
		</dl>
	);
}

export function DetailSectionView({ section }: { section: DetailSection }) {
	return (
		<section
			className={`panel category-section section-${section.kind}`}
			id={section.id}
			aria-labelledby={`title-${section.id}`}
		>
			<div className="section-heading">
				<h3 id={`title-${section.id}`}>{section.title}</h3>
			</div>
			<SectionBody section={section} />
		</section>
	);
}

function SectionBody({ section }: { section: DetailSection }) {
	switch (section.kind) {
		case "facts":
			return <DetailFacts facts={section.facts} />;
		case "profile":
			return (
				<>
					<DetailFacts facts={section.facts} />
					<div className="profile-attributes" id="attributes">
						<h4>{section.attributeLabel}</h4>
						<dl className="attribute-strip" aria-label={section.attributeLabel}>
							{attributes.map((attribute) => (
								<div key={attribute}>
									<dt>
										<abbr title={formatLabel(attribute)}>
											{attribute.slice(0, 3).toUpperCase()}
										</abbr>
									</dt>
									<dd>{section.attributes[attribute]}</dd>
								</div>
							))}
						</dl>
					</div>
				</>
			);
		case "mechanics":
			return <StructuredValue value={section.value} field={section.field} />;
		case "links":
			return (
				<div className="detail-links">
					{section.links.map((link, index) => (
						<RelatedEntry key={`${link.category}:${link.id}:${index}`} link={link} />
					))}
				</div>
			);
		case "applicability":
			return (
				<div className="applicability-rules">
					{section.rules.length > 1 && (
						<p className="muted">Match any one of these groups.</p>
					)}
					{section.rules.map((rule, index) => (
						<div className="applicability-rule" key={index}>
							{section.rules.length > 1 && <h4>Group {index + 1}</h4>}
							{Object.keys(rule).length === 0 ? (
								<p>Any item.</p>
							) : (
								<>
									<p className="section-note">
										Match all criteria in this group.
									</p>
									<DetailFacts
										facts={Object.entries(rule).map(([key, values]) => ({
											label: formatLabel(key),
											value: values.map(formatLabel).join(" or "),
										}))}
									/>
								</>
							)}
						</div>
					))}
				</div>
			);
		case "attack": {
			const attack = section.attack;
			const facts: DetailFact[] = [
				{ label: "Range", value: formatLabel(attack.attackRange) },
				{ label: "Damage class", value: formatLabel(attack.damage.damageClass) },
			];
			if (attack.attackAttribute) {
				facts.push({
					label: "Attack attribute",
					value: formatLabel(attack.attackAttribute),
				});
			}
			if (attack.damage.attribute) {
				facts.push({
					label: "Damage attribute",
					value: formatLabel(attack.damage.attribute),
				});
			}
			return (
				<>
					<div className="attack-identity">
						<ContentImage path={attack.icon} label={attack.name} />
						<div>
							<h4>{attack.name}</h4>
							<p className="attack-damage">
								{attack.damage.dice} {attack.damage.type} damage
							</p>
						</div>
					</div>
					<DetailFacts facts={facts} />
					{attack.attackRiders.length > 0 && <RiderFlow riders={attack.attackRiders} />}
				</>
			);
		}
	}
}

function RelatedEntry({ link }: { link: EntryLink }) {
	const catalog = catalogByKey[link.category];
	const entry = catalog.entries.find((entry) => entry.id === link.id);
	if (!entry) {
		return (
			<div className="related-entry">
				<strong>{link.id}</strong>
				<span className="muted">Unresolved {catalog.singular.toLowerCase()} reference</span>
			</div>
		);
	}
	const description =
		entry.description ??
		[entry.cells.subtype, entry.cells.stat]
			.filter((value) => value && value !== "—")
			.join(" · ");
	return (
		<Link className="related-entry" to={`/${link.category}/${link.id}`} aria-label={entry.name}>
			{entry.images[0] && <ContentImage path={entry.images[0]} label="" />}
			<div className="related-entry-copy">
				{(link.label || link.detail) && (
					<span className="related-entry-label">
						{[link.label, link.detail].filter(Boolean).join(" · ")}
					</span>
				)}
				<strong>{entry.name}</strong>
				{description && <p>{description}</p>}
				<code>{entry.id}</code>
			</div>
			<span className="related-entry-arrow" aria-hidden="true">
				→
			</span>
		</Link>
	);
}
