import type { PropsWithChildren } from "react";
import clsx from "clsx";
import { PanelTitle } from "./PanelTitle";

type CardProps = PropsWithChildren<{
	className?: string;
	contentClassName?: string;
	title?: string;
}>;

export function Card({ children, className, contentClassName, title }: CardProps) {
	return (
		<div className={clsx("relative border-2 border-border bg-bg-elevated", className)}>
			{title && <PanelTitle title={title} />}
			{contentClassName ? <div className={contentClassName}>{children}</div> : children}
		</div>
	);
}
