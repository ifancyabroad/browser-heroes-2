import clsx from "clsx";

type BadgeProps = {
	label: string;
	className?: string;
};

export function Badge({ label, className }: BadgeProps) {
	return <span className={clsx("border-2 border-border px-1", className)}>{label}</span>;
}
