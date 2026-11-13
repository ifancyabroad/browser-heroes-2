import type { ReactNode } from "react";
import clsx from "clsx";

const variantClasses = {
	default: "border-border",
	muted: "border-border-secondary",
	error: "border-error",
	warning: "border-warning",
	success: "border-success",
};

type BadgeProps = {
	label: ReactNode;
	variant?: keyof typeof variantClasses;
	textTone?: "default" | "bright";
	className?: string;
};

export function Badge({ label, variant = "default", textTone = "default", className }: BadgeProps) {
	return (
		<span
			className={clsx(
				"border-2 px-1",
				variantClasses[variant],
				textTone === "bright" ? "text-text-bright" : variant === "muted" && "text-text",
				className,
			)}
		>
			{label}
		</span>
	);
}
