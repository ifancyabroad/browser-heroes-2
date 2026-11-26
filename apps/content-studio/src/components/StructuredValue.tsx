import type { ReactNode } from "react";
import { attackRiderSchema, effectSchema, passiveModifierSchema } from "@app/content";
import { EffectFlow, ModifierFlow, RiderFlow } from "./EffectFlow";

import { formatDuration, formatLabel, formatValue } from "../content/presentation";

// Only flat values share columns. Every nested object gets the full available width.
function isFlatValue(value: unknown): boolean {
	return (
		value === null ||
		typeof value !== "object" ||
		isDuration(value) ||
		(Array.isArray(value) && value.every((item) => item === null || typeof item !== "object"))
	);
}

function isDuration(value: unknown): value is { value: number; unit: string } {
	return (
		typeof value === "object" &&
		value !== null &&
		"value" in value &&
		typeof value.value === "number" &&
		"unit" in value &&
		typeof value.unit === "string" &&
		Object.keys(value).length === 2
	);
}

function StructuredFields({ entries }: { entries: readonly [string, unknown][] }) {
	return (
		<dl className="fact-grid">
			{entries.map(([key, value]) => (
				<div className="fact" key={key}>
					<dt>{formatLabel(key)}</dt>
					<dd>
						<StructuredValue value={value} field={key} />
					</dd>
				</div>
			))}
		</dl>
	);
}

export function StructuredValue({
	value,
	index,
	field = "",
}: {
	value: unknown;
	index?: number;
	field?: string;
}): ReactNode {
	if (value === null || value === undefined) {
		return <span className="muted">—</span>;
	}
	if (typeof value === "boolean") {
		return value ? "Yes" : "No";
	}
	if (typeof value !== "object") {
		return typeof value === "string" ? formatValue(field, value) : String(value);
	}
	if (isDuration(value)) {
		return formatDuration(value);
	}
	if (Array.isArray(value)) {
		if (!value.length) {
			return <span className="muted">None</span>;
		}
		if (field === "effects") {
			const parsed = effectSchema.array().safeParse(value);
			if (parsed.success) {
				return <EffectFlow effects={parsed.data} authored={value} />;
			}
		}
		if (field === "attackRiders") {
			const parsed = attackRiderSchema.array().safeParse(value);
			if (parsed.success) {
				return <RiderFlow riders={parsed.data} authored={value} />;
			}
		}
		if (field === "modifiers") {
			const parsed = passiveModifierSchema.array().safeParse(value);
			if (parsed.success) {
				return <ModifierFlow modifiers={parsed.data} authored={value} />;
			}
		}
		if (isFlatValue(value)) {
			return (
				<ul className="value-chips">
					{value.map((item, i) => (
						<li key={i}>
							<StructuredValue value={item} field={field} />
						</li>
					))}
				</ul>
			);
		}
		return (
			<div className="value-list">
				{value.map((item, i) => (
					<div className="value-card" key={i}>
						<StructuredValue value={item} index={i + 1} />
					</div>
				))}
			</div>
		);
	}
	const record = value as Record<string, unknown>;
	const heading =
		typeof record.type === "string"
			? formatLabel(record.type)
			: typeof record.timing === "string"
				? formatLabel(record.timing)
				: undefined;
	const entries = Object.entries(record).filter(
		([key]) =>
			(key !== "type" || typeof record.type !== "string") &&
			(key !== "timing" ||
				typeof record.type === "string" ||
				typeof record.timing !== "string"),
	);
	const flat = entries.filter(([, item]) => isFlatValue(item));
	const nested = entries.filter(([, item]) => !isFlatValue(item));
	return (
		<div className="structured-object">
			{(heading || index !== undefined) && (
				<div className="object-heading">
					{index !== undefined && (
						<span className="effect-number" aria-label={`Item ${index}`}>
							{index}
						</span>
					)}
					<strong>{heading ?? "Entry"}</strong>
				</div>
			)}
			{flat.length > 0 && <StructuredFields entries={flat} />}
			{nested.map(([key, item]) => (
				<section className="value-branch" key={key} aria-label={formatLabel(key)}>
					<h4>{formatLabel(key)}</h4>
					<StructuredValue value={item} field={key} />
				</section>
			))}
			{entries.length === 0 && !heading && <span className="muted">None</span>}
		</div>
	);
}
