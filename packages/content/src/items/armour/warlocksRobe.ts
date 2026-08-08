import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warlocks_robe",
	name: "Warlock's Robe",
	description:
		"Dark energies steep this robe, empowering baleful magic while shielding its wearer from the touch of death.",
	icon: "items/armour/sets/cloth/Cloth6_Chest.png",
	price: 2900,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 14,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 4,
		},
	],
	tags: [],
});
