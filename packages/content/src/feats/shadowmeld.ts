import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "shadowmeld",
	name: "Shadowmeld",
	description: "Moving through darkness becomes instinctive, improving defense and accuracy.",
	icon: "skills/feats/shadowmeld.png",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["assassin"],
});
