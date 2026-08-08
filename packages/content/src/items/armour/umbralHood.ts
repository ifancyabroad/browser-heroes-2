import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_hood",
	name: "Umbral Hood",
	icon: "items/armour/sets/leather/Leather8_head.png",
	price: 2500,
	rarity: "legendary",
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
			stat: "criticalRangeBonus",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 5,
		},
	],
	tags: [],
});
