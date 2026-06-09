import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "dancers_grace",
	name: "Dancer's Grace",
	description: "Measured movement improves defense without sacrificing precision.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqWi-RbH2vwtAawttY?alt=media&token=b906457e-c916-43b2-957d-036855d70eb9",
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
			stat: "critChance",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["warrior"],
});
