import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "berserker",
	name: "Berserker",
	description:
		"Critical range increases by 2 and critical hits roll an additional set of damage dice. Critical hits also grant 1.5x damage on your next turn and advantage on your next attack, but Armour Class is reduced by 4.",
	icon: "feats/skill_200_noBG.png",
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
					duration: { unit: "turns", value: 1 },
				},
				{
					type: "modifyRoll",
					target: "self",
					roll: "attack",
					mode: "advantage",
					charges: 1,
					duration: { unit: "turns", value: 1 },
				},
			],
		},
	],
	tags: [],
});
