import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "crown_charm",
	name: "Crown Charm",
	icon: "items/armour/neck/Neck_b_05.png",
	price: 1400,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 4,
		},
	],
	tags: [],
});
