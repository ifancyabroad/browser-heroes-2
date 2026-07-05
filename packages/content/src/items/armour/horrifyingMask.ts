import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "horrifying_mask",
	name: "Horrifying Mask",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHy2JrV38T0OjNW-WBV?alt=media&token=2e3812ea-efd7-4a3a-80b3-456a6fda7425",
	price: 1450,
	rarity: "epic",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: -2,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
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
