import { CLASSES_BY_ID, FEATS_BY_ID, ITEMS_BY_ID, type Attribute } from "@app/content";
import type { HeroView } from "@app/engine";
import clsx from "clsx";
import { formatModifierValue, getNumberTone, getToneTextClassName } from "../../game/effectDisplay";

type StatValue = HeroView["attributes"][Attribute];
type StatContribution = StatValue["contributions"][number];

type StatTooltipContentProps = {
	label: string;
	stat: StatValue;
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
					{stat.contributions.map((contribution, index) => (
						<li
							key={`${contribution.source.type}-${index}`}
							className="flex items-baseline justify-between gap-3"
						>
							<span className="min-w-0 break-words">
								{getContributionSourceLabel(contribution.source)}
							</span>
							<span
								className={clsx(
									"shrink-0 text-right",
									getContributionClassName(contribution),
								)}
							>
								{formatContribution(contribution)}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function getContributionSourceLabel(source: StatContribution["source"]) {
	switch (source.type) {
		case "item":
			return ITEMS_BY_ID[source.itemId].name;
		case "feat":
			return FEATS_BY_ID[source.featId].name;
		case "class":
			return CLASSES_BY_ID[source.classId].name;
	}
}

function formatContribution(contribution: StatContribution) {
	return formatModifierValue(contribution.operation, contribution.modifierValue);
}

function getContributionClassName(contribution: StatContribution) {
	return getToneTextClassName(
		getNumberTone(contribution.resultingValue - contribution.previousValue),
	);
}

function formatStatNumber(value: number, signed = false) {
	if (!signed || value < 0) {
		return String(value);
	}

	return `+${value}`;
}
