import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_hood",
	name: "Umbral Hood",
	icon: "items/armour/sets/leather/Leather8_head.png",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
