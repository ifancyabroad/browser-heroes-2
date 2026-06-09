import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "armour",
	name: "Arcane Armour",
	description: "A thin layer of practiced magic constantly reinforces your defenses.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3xhpxzM4iz55_jXYj?alt=media&token=671e90b7-e472-4ad0-b5aa-47febe8bf8bb",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["mage"],
});
