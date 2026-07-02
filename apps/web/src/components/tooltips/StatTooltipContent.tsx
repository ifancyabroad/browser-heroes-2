import { CLASSES_BY_ID, FEATS_BY_ID, ITEMS_BY_ID, type Attribute } from "@app/content";
import type { HeroView } from "@app/engine";
import clsx from "clsx";
import { TooltipDetailList, TooltipSection } from "./TooltipContentPrimitives";

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
				<p className="break-words text-text-bright">{label}</p>
			</header>

			<TooltipDetailList
				rows={[
					{ label: "Base", value: formatStatNumber(stat.baseValue, signed) },
					{ label: "Current", value: formatStatNumber(stat.value, signed) },
				]}
			/>

			<TooltipSection title="Modifiers">
				{stat.contributions.length > 0 ? (
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
									{formatContribution(contribution, signed)}
								</span>
							</li>
						))}
					</ul>
				) : (
					<p className="text-text-muted">No modifiers</p>
				)}
			</TooltipSection>
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

function formatContribution(contribution: StatContribution, signed: boolean) {
	const valueLabel =
		contribution.operation === "multiply"
			? `x${contribution.modifierValue}`
			: formatStatNumber(
					contribution.modifierValue,
					signed || contribution.operation === "add",
				);

	return `${valueLabel} (${formatStatNumber(contribution.previousValue, signed)} -> ${formatStatNumber(
		contribution.resultingValue,
		signed,
	)})`;
}

function getContributionClassName(contribution: StatContribution) {
	return getNumberClassName(contribution.resultingValue - contribution.previousValue);
}

function getNumberClassName(value: number) {
	if (value > 0) {
		return "text-success";
	}

	if (value < 0) {
		return "text-error";
	}

	return "text-text-bright";
}

function formatStatNumber(value: number, signed = false) {
	if (!signed || value < 0) {
		return String(value);
	}

	return `+${value}`;
}
