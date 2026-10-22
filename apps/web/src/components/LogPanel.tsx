import type { PropsWithChildren } from "react";

export function LogPanel({ title, children }: PropsWithChildren<{ title: string }>) {
	return (
		<section
			aria-label={title}
			className="flex min-h-[10lh] flex-1 basis-0 flex-col text-base leading-6"
		>
			{children}
		</section>
	);
}
