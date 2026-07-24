import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "armour",
	name: "Arcane Armour",
	description: "A thin layer of practiced magic constantly reinforces your defenses.",
	icon: "skills/feats/armour.png",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["mage"],
});
