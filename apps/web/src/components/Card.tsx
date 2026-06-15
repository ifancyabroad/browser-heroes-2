import type { PropsWithChildren } from "react";
import clsx from "clsx";

type CardProps = PropsWithChildren<{ className?: string }>;

export function Card({ children, className }: CardProps) {
	return (
		<div className={clsx("border-2 border-border bg-bg-elevated", className)}>{children}</div>
	);
}
