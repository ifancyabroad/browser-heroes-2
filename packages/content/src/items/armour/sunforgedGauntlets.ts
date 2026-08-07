import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_gauntlets",
	name: "Sunforged Gauntlets",
	icon: "items/armour/sets/mail/Mail13_gloves.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 2,
		},
	],
	tags: [],
});
