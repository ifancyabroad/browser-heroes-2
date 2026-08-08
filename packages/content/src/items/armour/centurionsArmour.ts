import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_armour",
	name: "Centurion's Armour",
	icon: "items/armour/sets/mail/Mail17_Chest.png",
	price: 1800,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 19,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
	],
	tags: [],
});
