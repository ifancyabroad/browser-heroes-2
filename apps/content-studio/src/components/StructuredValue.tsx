import type { ReactNode } from "react";

const labels: Record<string, string> = {
	attackDamage: "Attack damage",
	damageOverTime: "Damage over time",
	healOverTime: "Heal over time",
	modifyDamageAffinity: "Modify damage affinity",
	modifyDamageTaken: "Modify damage taken",
	modifyHealing: "Modify healing",
	modifyRoll: "Modify roll",
	modifyStat: "Modify stat",
	applyStatus: "Apply status",
	removeStatus: "Remove status",
};

function title(value: string) {
	return (
		labels[value] ??
		value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())
	);
}

export function StructuredValue({ value }: { value: unknown }): ReactNode {
	if (value === null || value === undefined) {
		return <span className="muted">—</span>;
	}
	if (typeof value === "boolean") {
		return value ? "Yes" : "No";
	}
	if (typeof value !== "object") {
		return String(value);
	}
	if (Array.isArray(value)) {
		if (value.length === 0) {
			return <span className="muted">None</span>;
		}
		return (
			<div className="value-list">
				{value.map((item, index) => (
					<div className="value-card" key={index}>
						<StructuredValue value={item} />
					</div>
				))}
			</div>
		);
	}
	const record = value as Record<string, unknown>;
	const discriminator = typeof record.type === "string" ? title(record.type) : undefined;
	return (
		<div className="structured-object">
			{discriminator && <strong className="object-title">{discriminator}</strong>}
			<dl>
				{Object.entries(record)
					.filter(([key]) => key !== "type")
					.map(([key, item]) => (
						<div className="field-row" key={key}>
							<dt>{title(key)}</dt>
							<dd>
								<StructuredValue value={item} />
							</dd>
						</div>
					))}
			</dl>
		</div>
	);
}
