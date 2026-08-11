import type { ReactNode } from "react";
import clsx from "clsx";

type BadgeProps = {
	label: ReactNode;
	variant?: "default" | "muted";
	textTone?: "default" | "bright";
	className?: string;
};

export function Badge({ label, variant = "default", textTone = "default", className }: BadgeProps) {
	return (
		<span
			className={clsx(
				"border-2 px-1",
				variant === "default" ? "border-border" : "border-border-secondary",
				textTone === "bright" ? "text-text-bright" : variant === "muted" && "text-text",
				className,
			)}
		>
			{label}
		</span>
	);
}
