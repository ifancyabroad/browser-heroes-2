import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ring_of_shadows",
	name: "Ring of Shadows",
	description:
		"A ring cloaked in darkness, granting its wearer the ability to blend into shadows.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEj39PbQX8tVy6BGOU?alt=media&token=3e03031d-7e39-4865-b30c-4f4eace7e766",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "ring",
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
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 3,
		},
	],
	tags: [],
});
