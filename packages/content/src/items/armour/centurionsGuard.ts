import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_guard",
	name: "Centurion's Guard",
	icon: "items/armour/sets/mail/Mail17_head.png",
	price: 2200,
	rarity: "legendary",
	restrictedToClassIds: ["battlemage"],
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 4,
		},
	],
	tags: [],
});
