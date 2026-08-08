import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_hood",
	name: "Deathstalker Hood",
	icon: "items/armour/sets/leather/Leather13_head.png",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "poison",
		},
	],
	tags: [],
});
