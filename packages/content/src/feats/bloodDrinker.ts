import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "blood_drinker",
	name: "Blood Drinker",
	description: "Expand your critical hit range and restore HP on critical hits.",
	icon: "feats/Skill_Thirst_nb.png",
	kind: "martial",
	category: "resource",
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 2,
		},
	],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "2d8",
				},
			],
		},
	],
	tags: [],
});
