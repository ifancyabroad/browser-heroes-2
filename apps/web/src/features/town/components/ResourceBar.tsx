import clsx from "clsx";

type ResourceBarTone = "hp" | "xp";

type ResourceBarProps = {
	label: string;
	value: string;
	tone: ResourceBarTone;
	fillPercent?: number;
};

const fillClassByTone: Record<ResourceBarTone, string> = {
	hp: "bg-hp",
	xp: "bg-xp",
};

function clampPercent(value: number) {
	return Math.max(0, Math.min(100, value));
}

export function ResourceBar({ label, value, tone, fillPercent }: ResourceBarProps) {
	const clampedFillPercent = typeof fillPercent === "number" ? clampPercent(fillPercent) : null;

	return (
		<div className="grid grid-cols-[2rem_1fr_auto] items-center gap-2 text-base">
			<span className="text-text-label">{label}</span>
			<div className="h-4 bg-bg-elevated" aria-label={`${label} bar`}>
				{clampedFillPercent !== null && (
					<div
						className={clsx("h-full", fillClassByTone[tone])}
						style={{ width: `${clampedFillPercent}%` }}
					/>
				)}
			</div>
			<span className="text-text-bright">{value}</span>
		</div>
	);
}
