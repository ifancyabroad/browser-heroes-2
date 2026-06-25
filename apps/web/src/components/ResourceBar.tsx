import clsx from "clsx";

type ResourceBarTone = "hp" | "xp";

type ResourceBarProps = {
	label: string;
	tone: ResourceBarTone;
	value: string;
	fillPercent?: number;
	className?: string;
};

const fillClassByTone: Record<ResourceBarTone, string> = {
	hp: "bg-hp",
	xp: "bg-xp",
};

function clampPercent(value: number) {
	return Math.max(0, Math.min(100, value));
}

export function ResourceBar({ label, tone, value, fillPercent, className }: ResourceBarProps) {
	const clampedFillPercent = typeof fillPercent === "number" ? clampPercent(fillPercent) : null;
	const accessibleLabel = `${label} ${value}`;

	return (
		<div
			className={clsx(
				"grid grid-cols-[minmax(5rem,1fr)_7rem] items-center gap-3 text-base",
				className,
			)}
			title={accessibleLabel}
		>
			<div className="h-4 bg-text-muted/30" aria-label={accessibleLabel}>
				{clampedFillPercent !== null && (
					<div
						className={clsx("h-full", fillClassByTone[tone])}
						style={{ width: `${clampedFillPercent}%` }}
					/>
				)}
			</div>
			<p className="min-w-0 truncate text-left text-text-bright">
				<span className="text-text-label">{label}</span> <span>{value}</span>
			</p>
		</div>
	);
}
