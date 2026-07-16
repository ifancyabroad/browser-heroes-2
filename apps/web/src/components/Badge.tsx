import clsx from "clsx";

type BadgeProps = {
	label: string;
	variant?: "default" | "muted";
	className?: string;
};

export function Badge({ label, variant = "default", className }: BadgeProps) {
	return (
		<span
			className={clsx(
				"border-2 px-1",
				variant === "default" ? "border-border" : "border-border-secondary text-text",
				className,
			)}
		>
			{label}
		</span>
	);
}
