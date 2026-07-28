import type { Attribute } from "@app/content";
import type { HeroView } from "@app/engine";
import { formatModifierValue } from "./effects";

type DerivedStat = HeroView["attributes"][Attribute];
type ModifierContribution = DerivedStat["contributions"][number];

export type StatDisplayContribution = {
	key: string;
	label: string;
	displayValue: string;
	delta: number;
};

export type StatPresentation = {
	value: number;
	referenceValue: number;
	contributions: StatDisplayContribution[];
};

export function formatStatValue(value: number, signed = false) {
	if (!signed || value < 0) {
		return String(value);
	}

	return `+${value}`;
}

export function getStatPresentation(stat: DerivedStat): StatPresentation {
	return {
		value: stat.value,
		referenceValue: stat.baseValue,
		contributions: stat.contributions.map(getModifierContributionPresentation),
	};
}

export function getArmourClassStatPresentation(
	breakdown: HeroView["armourClassBreakdown"],
): StatPresentation {
	const contributions: StatDisplayContribution[] = [];

	if (breakdown.dexterity.applied !== 0) {
		contributions.push({
			key: "dexterity",
			label: "Dexterity",
			displayValue: formatModifierValue("add", breakdown.dexterity.applied),
			delta: breakdown.dexterity.applied,
		});
	}

	if (breakdown.shield) {
		contributions.push({
			key: "shield",
			label: breakdown.shield.sourceName,
			displayValue: formatModifierValue("add", breakdown.shield.value),
			delta: breakdown.shield.value,
		});
	}

	contributions.push(...breakdown.contributions.map(getModifierContributionPresentation));

	return {
		value: breakdown.value,
		referenceValue: breakdown.armour.value,
		contributions,
	};
}

function getModifierContributionPresentation(
	contribution: ModifierContribution,
	index: number,
): StatDisplayContribution {
	return {
		key: `${contribution.source.type}-${index}`,
		label: contribution.source.sourceName,
		displayValue: formatModifierValue(contribution.operation, contribution.modifierValue),
		delta: contribution.resultingValue - contribution.previousValue,
	};
}
