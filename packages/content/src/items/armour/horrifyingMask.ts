import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "horrifying_mask",
	name: "Horrifying Mask",
	description:
		"A grotesque mask steeped in forbidden knowledge, sacrificing mortal charm to empower devastating necrotic magic.",
	icon: "items/armour/helms/Helm_36_mask.png",
	price: 2500,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			value: -2,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 4,
		},
	],
	tags: [],
});
