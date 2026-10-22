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
