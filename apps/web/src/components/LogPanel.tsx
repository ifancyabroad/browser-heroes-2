import type { PropsWithChildren } from "react";

export function LogPanel({ title, children }: PropsWithChildren<{ title: string }>) {
	return (
		<section
			aria-label={title}
			className="flex shrink-0 flex-col border-2 border-border-secondary bg-bg-panel text-base leading-6"
		>
			<h2 className="shrink-0 border-b-2 border-border-secondary px-3 py-2 text-text-bright">
				{title}
			</h2>
			<div className="box-content flex h-[12lh] shrink-0 flex-col p-3">{children}</div>
		</section>
	);
}
