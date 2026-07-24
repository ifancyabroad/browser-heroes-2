import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "horrifying_mask",
	name: "Horrifying Mask",
	icon: "items/armour/helms/Helm_36_mask.png",
	price: 1450,
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
			value: 40,
		},
	],
	tags: [],
});
