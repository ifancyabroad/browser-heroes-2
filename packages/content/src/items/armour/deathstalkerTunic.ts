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
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
	],
	tags: [],
});
