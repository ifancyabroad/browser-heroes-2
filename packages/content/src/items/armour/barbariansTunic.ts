import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "barbarians_tunic",
	name: "Barbarian's Tunic",
	description:
		"A rugged tunic that forsakes rigid protection for primal strength, endurance, and sheer vitality.",
	icon: "items/armour/chest/BarbarianChest.png",
	price: 4000,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 17,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 30,
		},
	],
	tags: [],
});
