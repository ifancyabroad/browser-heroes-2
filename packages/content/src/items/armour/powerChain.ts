import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "power_chain",
	name: "Power Chain",
	icon: "items/armour/neck/necklace_10.png",
	price: 1520,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 4,
		},
	],
	tags: [],
});
