import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "blood_drinker",
	name: "Blood Drinker",
	description: "Critical hits restore 1d8 HP.",
	icon: "skills/feats/Skill_Thirst_nb.png",
	kind: "training",
	category: "resource",
	modifiers: [],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "1d8",
				},
			],
		},
	],
	tags: [],
});
