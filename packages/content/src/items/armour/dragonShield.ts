import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragon_shield",
	name: "Dragon Shield",
	description:
		"Forged in the likeness of a great wyrm, this shield lends its bearer draconic strength, command of flame, and immunity to fire.",
	icon: "items/armour/shields/shield_47.png",
	price: 4800,
	rarity: "legendary",
	type: "armour",
	slot: "shield",
	armourClass: 6,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "fire",
		},
	],
	tags: [],
});
