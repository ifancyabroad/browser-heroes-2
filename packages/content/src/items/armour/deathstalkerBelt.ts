import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_belt",
	name: "Deathstalker Belt",
	icon: "items/armour/sets/leather/Leather13_belt.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	tags: [],
});
