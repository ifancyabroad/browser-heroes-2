import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "berserker",
	name: "Berserker",
	description:
		"Expand your critical hit range and increase your critical hit damage dice multiplier at the cost of Armour Class. Critical hits temporarily increase your damage dealt and grant advantage on your next attack roll.",
	icon: "feats/skill_189_noBG.png",
	kind: "martial",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			value: -4,
		},
	],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					operation: "multiply",
					value: 1.5,
					duration: {
						unit: "turns",
						value: 1,
					},
				},
				{
					type: "modifyRoll",
					target: "self",
					roll: "attack",
					mode: "advantage",
					charges: 1,
					duration: {
						unit: "turns",
						value: 1,
					},
				},
			],
		},
	],
	tags: [],
});
