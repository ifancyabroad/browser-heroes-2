import type { Effect } from "@app/content";
import { formatLabel } from "./presentation";

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value}`;
const attributeBonus = (attribute?: string) =>
	attribute ? ` + ${formatLabel(attribute)} modifier` : "";
const selectors = (effect: { damageType?: string; damageClass?: string; attackRange?: string }) =>
	[effect.damageClass, effect.attackRange, effect.damageType].filter(Boolean).join(" ");

// Describe authored inputs only; resolved amounts and roll outcomes belong to the engine.
export function describeEffect(effect: Effect): { title: string; description: string } {
	switch (effect.type) {
		case "attackDamage": {
			const notes = [
				`${effect.multiplier}× weapon damage${effect.damageTypeOverride ? `, converted to ${effect.damageTypeOverride}` : ""}.`,
				effect.damageClassOverride && `Damage class: ${effect.damageClassOverride}.`,
				effect.attackRangeOverride && `Attack range: ${effect.attackRangeOverride}.`,
				effect.extraDice &&
					`Extra damage: ${effect.extraDice} ${effect.extraDamageType ?? effect.damageTypeOverride ?? "weapon-type"} (${effect.extraDamageClass}).`,
				effect.rollMode && `Attack roll: ${effect.rollMode}.`,
			].filter(Boolean);
			return { title: "Weapon attack", description: notes.join(" ") };
		}
		case "damage":
			return {
				title: `${formatLabel(effect.damageType)} damage`,
				description: `${effect.dice}${attributeBonus(effect.attribute)} ${selectors(effect)} damage.${effect.requiresAttackRoll ? " Requires an attack roll." : ""}`,
			};
		case "heal":
			return {
				title: "Healing",
				description:
					effect.percent !== undefined
						? `Restore ${Number((effect.percent * 100).toFixed(6))}% of maximum HP.`
						: `Restore ${effect.dice}${attributeBonus(effect.attribute)} HP.`,
			};
		case "damageOverTime":
			return {
				title: `${formatLabel(effect.damageType)} damage over time`,
				description: `${effect.dice} ${effect.damageClass} ${effect.damageType} damage per turn.`,
			};
		case "healOverTime":
			return {
				title: "Healing over time",
				description: `Restore ${effect.dice} HP per turn.`,
			};
		case "shield":
			return { title: "Shield", description: `Gain ${effect.amount} shield.` };
		case "applyStatus":
			return {
				title: formatLabel(effect.statusId),
				description: `Apply ${effect.statusId}.`,
			};
		case "removeStatus": {
			const statuses = [
				...effect.statusIds,
				...(effect.allNegative ? ["all negative statuses"] : []),
				...(effect.allPositive ? ["all positive statuses"] : []),
			];
			return {
				title: "Remove statuses",
				description: `Remove ${statuses.join(", ")}. Authored effect; currently unsupported by the engine.`,
			};
		}
		case "modifyStat":
			return {
				title: formatLabel(effect.stat),
				description: `${signed(effect.value)} ${formatLabel(effect.stat).toLowerCase()}.`,
			};
		case "modifyHealing":
			return {
				title: "Healing modifier",
				description: `Multiply healing by ${effect.multiplier}.`,
			};
		case "modifyDamage":
		case "modifyDamageTaken": {
			const subject =
				`${selectors(effect)} damage${effect.type === "modifyDamageTaken" ? " taken" : " dealt"}`.trim();
			return {
				title:
					effect.type === "modifyDamageTaken"
						? "Damage taken modifier"
						: "Damage dealt modifier",
				description:
					effect.operation === "multiply"
						? `Multiply ${subject} by ${effect.value}.`
						: `${signed(effect.value)} ${subject}.`,
			};
		}
		case "modifyDamageAffinity":
			return {
				title: `${formatLabel(effect.damageType)} ${effect.affinity}`,
				description: `${effect.operation === "add" ? "Grant" : "Remove"} ${effect.affinity} to ${effect.damageType} damage.`,
			};
		case "modifyRoll": {
			const roll =
				effect.roll === "savingThrow"
					? `${effect.attribute ? effect.attribute + " " : ""}saving throws`
					: `${effect.attribute ? effect.attribute + " " : ""}attack rolls`;
			return {
				title: `${formatLabel(effect.mode)} · ${effect.roll === "savingThrow" ? "saves" : "attacks"}`,
				description: `${formatLabel(effect.mode)} on ${roll}${effect.charges !== undefined ? `; ${effect.charges} ${effect.charges === 1 ? "charge" : "charges"}` : ""}.`,
			};
		}
	}
}
