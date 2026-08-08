import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_robe",
	name: "Archmage's Robe",
	icon: "items/armour/sets/cloth/Cloth17_Chest.png",
	price: 2600,
	rarity: "legendary",
	restrictedToClassIds: ["mage"],
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 14,
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
			value: 4,
		},
	],
	tags: [],
});
