import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "blood_drinker",
	name: "Blood Drinker",
	description: "Critical range increases by 2 and critical hits restore 2d8 HP.",
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
