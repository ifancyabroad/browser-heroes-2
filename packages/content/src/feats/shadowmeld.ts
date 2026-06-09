import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "shadowmeld",
	name: "Shadowmeld",
	description: "Moving through darkness becomes instinctive, improving defense and accuracy.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI1dWGnsVHDHZWQOZRy?alt=media&token=d29aaa04-a0a6-45b6-931f-867a0796a635",
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
