import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragons_gem",
	name: "Dragon's Gem",
	description:
		"A ring housing a sparkling dragon's gem, amplifying the wearer's power and resilience.",
	icon: "items/armour/ring/Ring_b_08.png",
	price: 1650,
	rarity: "legendary",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 4,
		},
	],
	tags: [],
});
