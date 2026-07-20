import clsx from "clsx";
import { getNumberTone, getToneTextClassName } from "../../game/effectDisplay";
import type { StatPresentation } from "../../game/statDisplay";

type StatTooltipContentProps = {
	label: string;
	stat: StatPresentation;
	signed?: boolean;
};

export function StatTooltipContent({ label, stat, signed = false }: StatTooltipContentProps) {
	return (
		<div className="grid gap-2">
			<div className="flex items-baseline justify-between gap-3">
				<p className="min-w-0 break-words text-text-label">{label}</p>
				<p className="shrink-0 text-text-bright">{formatStatNumber(stat.value, signed)}</p>
			</div>

			{stat.contributions.length > 0 && (
				<ul className="grid gap-1">
					{stat.contributions.map((contribution) => (
						<li
							key={contribution.key}
							className="flex items-baseline justify-between gap-3"
						>
							<span className="min-w-0 break-words">{contribution.label}</span>
							<span
								className={clsx(
									"shrink-0 text-right",
									getToneTextClassName(getNumberTone(contribution.delta)),
								)}
							>
								{contribution.displayValue}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function formatStatNumber(value: number, signed = false) {
	if (!signed || value < 0) {
		return String(value);
	}

	return `+${value}`;
}
