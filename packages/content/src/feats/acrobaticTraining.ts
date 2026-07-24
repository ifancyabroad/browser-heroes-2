import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "acrobatic_training",
	name: "Acrobatic Training",
	description: "Years of agility training improve your chance to land critical hits.",
	icon: "skills/feats/acrobatic_training.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["assassin"],
});
