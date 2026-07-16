import type { HeroView } from "@app/engine";
import clsx from "clsx";
import { damageTypeLabels } from "../../game/displayLabels";
import {
	formatModifierValue,
	getNumericModifierTone,
	getToneTextClassName,
} from "../../game/effectDisplay";
import { getModifierSourceLabel } from "../../game/modifierSourceDisplay";

type DamageAffinity = HeroView["combatStats"]["damageAffinities"]["resistances"][number];
type DamageModifierGroup = HeroView["combatStats"]["damageModifiers"][number];

type DamageAffinityTooltipContentProps = {
	affinity: DamageAffinity;
	affinityLabel: string;
};

export function DamageAffinityTooltipContent({
	affinity,
	affinityLabel,
}: DamageAffinityTooltipContentProps) {
	return (
		<div className="grid gap-2">
			<p className="break-words text-text-label">
				{damageTypeLabels[affinity.damageType]} {affinityLabel}
			</p>

			{(affinity.baseValue || affinity.contributions.length > 0) && (
				<ul className="grid gap-1">
					{affinity.baseValue && (
						<li className="flex items-baseline justify-between gap-3">
							<span>Base</span>
							<span className="text-success">Added</span>
						</li>
					)}
					{affinity.contributions.map((contribution, index) => (
						<li
							key={`${contribution.source.type}-${contribution.operation}-${index}`}
							className="flex items-baseline justify-between gap-3"
						>
							<span className="min-w-0 break-words">
								{getModifierSourceLabel(contribution.source)}
							</span>
							<span
								className={clsx(
									"shrink-0",
									contribution.operation === "add"
										? "text-success"
										: "text-error",
								)}
							>
								{contribution.operation === "add" ? "Added" : "Removed"}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export function DamageModifierTooltipContent({
	modifierGroup,
}: {
	modifierGroup: DamageModifierGroup;
}) {
	const damageType = modifierGroup.damageType
		? damageTypeLabels[modifierGroup.damageType]
		: "All";

	return (
		<div className="grid gap-2">
			<p className="break-words text-text-label">{damageType} Damage</p>
			<ul className="grid gap-1">
				{modifierGroup.contributions.map(({ source, modifierValue }, index) => (
					<li
						key={`${source.type}-${index}`}
						className="flex items-baseline justify-between gap-3"
					>
						<span className="min-w-0 break-words">
							{getModifierSourceLabel(source)}
						</span>
						<span
							className={clsx(
								"shrink-0 text-right",
								getToneTextClassName(
									getNumericModifierTone(modifierGroup.operation, modifierValue),
								),
							)}
						>
							{formatModifierValue(modifierGroup.operation, modifierValue)}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
