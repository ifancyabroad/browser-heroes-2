import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_gauntlets",
	name: "Centurion's Gauntlets",
	icon: "items/armour/sets/mail/Mail17_gloves.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
