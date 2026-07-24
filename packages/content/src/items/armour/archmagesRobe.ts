import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_robe",
	name: "Archmage's Robe",
	icon: "items/armour/sets/cloth/Cloth17_Chest.png",
	price: 1800,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
	],
	tags: [],
});
