import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "knights_mail",
	name: "Knight's Mail",
	description:
		"Mail forged for a noble champion, reinforcing martial strength, commanding presence, and unwavering resolve.",
	icon: "items/armour/sets/mail/Mail14_Chest.png",
	price: 1560,
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
			type: "modifyStat",
			stat: "charisma",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
	],
	tags: [],
});
