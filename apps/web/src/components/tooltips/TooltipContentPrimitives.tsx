import type { ReactNode } from "react";

export type TooltipDetailRow = {
	label: string;
	value: string;
	valueClassName?: string;
};

export function TooltipDetailList({
	rows,
	valueClassName = "",
}: {
	rows: readonly TooltipDetailRow[];
	valueClassName?: string;
}) {
	return (
		<dl className="grid gap-1 border-t-2 border-border/70 pt-2">
			{rows.map((row) => (
				<div key={row.label} className="flex items-baseline justify-between gap-3">
					<dt className="shrink-0 text-text-label">{row.label}</dt>
					<dd
						className={`min-w-0 break-words text-right ${
							row.valueClassName ?? valueClassName
						}`}
					>
						{row.value}
					</dd>
				</div>
			))}
		</dl>
	);
}

export function TooltipSection({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className="grid gap-1 border-t-2 border-border/70 pt-2" aria-label={title}>
			<p className="text-text-label">{title}</p>
			{children}
		</section>
	);
}
