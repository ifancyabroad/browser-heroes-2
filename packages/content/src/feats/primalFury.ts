import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "primal_fury",
	name: "Primal Fury",
	description: "Fury is always close to the surface, improving accuracy and physical damage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCUBEkE8QnAlklRcUe4?alt=media&token=9bc125b8-862a-4744-bb4a-4cabb7069e6e",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 1,
		},
		{
			type: "modifyDamage",
			operation: "add",
			value: 10,
		},
	],
	attackRiders: [],
	tags: ["barbarian"],
});
