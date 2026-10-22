import type { PropsWithChildren } from "react";
import clsx from "clsx";

export function GameMainPanel({ children }: PropsWithChildren) {
	return <section className="flex min-w-0 flex-1 flex-col overflow-hidden">{children}</section>;
}

export function GamePanelContainer({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<div className={clsx("mx-auto w-full max-w-6xl px-4 md:px-6", className)}>{children}</div>
	);
}
