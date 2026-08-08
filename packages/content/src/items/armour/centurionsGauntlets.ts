import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_gauntlets",
	name: "Centurion's Gauntlets",
	icon: "items/armour/sets/mail/Mail17_gloves.png",
	price: 2600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
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
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
	],
	tags: [],
});
