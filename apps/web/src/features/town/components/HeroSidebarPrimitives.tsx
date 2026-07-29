import type { ReactNode } from "react";

type HeroSidebarSectionProps = {
	title: string;
	children: ReactNode;
};

export function HeroSidebarSection({ title, children }: HeroSidebarSectionProps) {
	return (
		<section className="grid gap-2" aria-label={title}>
			<h2 className="text-text-bright">{title}</h2>
			{children}
		</section>
	);
}

export function EmptySidebarText({ children }: { children: ReactNode }) {
	return <p className="text-text-muted">{children}</p>;
}

export function SidebarValueList({ values }: { values: readonly string[] }) {
	if (values.length === 0) {
		return <EmptySidebarText>None</EmptySidebarText>;
	}

	return (
		<ul className="flex flex-wrap gap-x-2 gap-y-1">
			{values.map((value, index) => (
				<li key={value}>
					{index > 0 && <span className="mr-2 text-text-muted">/</span>}
					<span>{value}</span>
				</li>
			))}
		</ul>
	);
}
