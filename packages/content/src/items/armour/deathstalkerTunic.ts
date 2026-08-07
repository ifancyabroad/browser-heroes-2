import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_tunic",
	name: "Deathstalker Tunic",
	icon: "items/armour/sets/leather/Leather13_Chest.png",
	price: 1800,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 16,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
	],
	tags: [],
});
