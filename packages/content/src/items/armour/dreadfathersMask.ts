import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_mask",
	name: "Dreadfather's Mask",
	icon: "items/armour/sets/cloth/Cloth7_Head.png",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			value: -4,
		},
	],
	tags: [],
});
