import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "unyielding_guard",
	name: "Unyielding Guard",
	description: "A fearless defensive style improves protection at the cost of precision.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHyOBLC1CXRvTaWkjeL?alt=media&token=d9a63a20-849d-4002-b9b6-06e9ea2a9c4e",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: -1,
		},
	],
	attackRiders: [],
	tags: ["barbarian"],
});
