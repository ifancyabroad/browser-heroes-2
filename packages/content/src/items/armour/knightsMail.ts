import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "knights_mail",
	name: "Knight's Mail",
	icon: "items/armour/sets/mail/Mail14_Chest.png",
	price: 1560,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 15,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 20,
		},
	],
	tags: [],
});
