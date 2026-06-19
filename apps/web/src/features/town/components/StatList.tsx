import type { ReactNode } from "react";

export type StatListItem = {
	label: string;
	value: ReactNode;
};

type StatListProps = {
	items: StatListItem[];
};

export function StatList({ items }: StatListProps) {
	return (
		<dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-base">
			{items.map((item) => (
				<div key={item.label} className="flex items-center justify-between gap-2">
					<dt className="text-text-label">{item.label}</dt>
					<dd className="text-right text-text-bright">{item.value}</dd>
				</div>
			))}
		</dl>
	);
}
