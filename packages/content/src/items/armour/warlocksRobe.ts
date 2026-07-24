import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warlocks_robe",
	name: "Warlock's Robe",
	icon: "items/armour/sets/cloth/Cloth6_Chest.png",
	price: 1620,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
	],
	tags: [],
});
