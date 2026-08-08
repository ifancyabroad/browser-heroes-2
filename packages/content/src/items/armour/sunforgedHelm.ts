import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_helm",
	name: "Sunforged Helm",
	icon: "items/armour/sets/mail/Mail13_head.png",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 4,
		},
	],
	tags: [],
});
