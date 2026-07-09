import { CLASSES_BY_ID, FEATS_BY_ID, ITEMS_BY_ID, type Attribute } from "@app/content";
import type { HeroView } from "@app/engine";
import clsx from "clsx";
import { TooltipDetailList, TooltipSection } from "./TooltipContentPrimitives";
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
		<div className="grid gap-3">
			<header className="grid gap-1">
				<p className="break-words">{label}</p>
			</header>

			<TooltipDetailList
				rows={[
					{ label: "Base", value: formatStatNumber(stat.baseValue, signed) },
					{
						label: "Current",
						value: formatStatNumber(stat.value, signed),
						valueClassName: "text-text-bright",
					},
				]}
			/>

			{stat.contributions.length > 0 && (
				<TooltipSection title="Modifiers">
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
				</TooltipSection>
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
