import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_gauntlets",
	name: "Sunforged Gauntlets",
	icon: "items/armour/sets/mail/Mail13_gloves.png",
	price: 2600,
	rarity: "legendary",
	restrictedToClassIds: ["paladin"],
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
			stat: "strength",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
	],
	tags: [],
});
