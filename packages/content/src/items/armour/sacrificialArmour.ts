import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sacrificial_armour",
	name: "Sacrificial Armour",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8DB8llPrfIqwDRaGca?alt=media&token=f0558ab9-d029-42a2-984f-f46c40e10257",
	price: 1740,
	rarity: "epic",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 12,
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 3,
		},
	],
	tags: [],
});
