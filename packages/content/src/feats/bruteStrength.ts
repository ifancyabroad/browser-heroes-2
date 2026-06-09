import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "brute_strength",
	name: "Brute Strength",
	description: "Hard-earned muscle grants lasting strength.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhggr8CtVaNEZYVBilF?alt=media&token=a574eb3a-0e7e-4582-ac8b-a8fa654ff4a0",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["barbarian"],
});
