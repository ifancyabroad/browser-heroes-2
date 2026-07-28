import type { PropsWithChildren } from "react";
import clsx from "clsx";
import { PanelTitle } from "./PanelTitle";

type CardProps = PropsWithChildren<{
	className?: string;
	contentClassName?: string;
	title?: string;
	titleAlign?: "left" | "center";
}>;

export function Card({ children, className, contentClassName, title, titleAlign }: CardProps) {
	return (
		<div className={clsx("relative border-2 border-border bg-bg-elevated", className)}>
			{title && <PanelTitle title={title} align={titleAlign} />}
			{contentClassName ? <div className={contentClassName}>{children}</div> : children}
		</div>
	);
}
