import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deadshot_girdle",
	name: "Deadshot Girdle",
	icon: "items/armour/belts/Belt_32.png",
	price: 1320,
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
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 4,
		},
	],
	tags: [],
});
