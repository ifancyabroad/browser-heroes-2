import type { HeroView } from "@app/engine";
import clsx from "clsx";
import { damageTypeLabels } from "../../game/displayLabels";
import {
	formatModifierValue,
	getDamageTakenModifierTone,
	getNumericModifierTone,
	getToneTextClassName,
} from "../../game/effectDisplay";

type DamageAffinity = HeroView["combatStats"]["damageAffinities"]["resistances"][number];
type DamageModifierGroup = HeroView["combatStats"]["damageModifiers"][number];
export type DamageModifierKind = "damageBonus" | "damageReduction";

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
								{contribution.source.sourceName}
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
	kind,
}: {
	modifierGroup: DamageModifierGroup;
	kind: DamageModifierKind;
}) {
	const damageType = modifierGroup.damageType
		? damageTypeLabels[modifierGroup.damageType]
		: "All";

	return (
		<div className="grid gap-2">
			<p className="break-words text-text-label">
				{damageType} Damage {kind === "damageReduction" ? "Reduction" : "Bonus"}
			</p>
			<ul className="grid gap-1">
				{modifierGroup.contributions.map(({ source, modifierValue }, index) => (
					<li
						key={`${source.type}-${index}`}
						className="flex items-baseline justify-between gap-3"
					>
						<span className="min-w-0 break-words">{source.sourceName}</span>
						<span
							className={clsx(
								"shrink-0 text-right",
								getToneTextClassName(
									kind === "damageReduction"
										? getDamageTakenModifierTone(
												modifierGroup.operation,
												modifierValue,
											)
										: getNumericModifierTone(
												modifierGroup.operation,
												modifierValue,
											),
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
