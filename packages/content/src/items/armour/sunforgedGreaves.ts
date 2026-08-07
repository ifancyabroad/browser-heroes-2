import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_greaves",
	name: "Sunforged Greaves",
	icon: "items/armour/sets/mail/Mail13_Boots.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
	],
	tags: [],
});
