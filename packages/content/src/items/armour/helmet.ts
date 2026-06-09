import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "helmet",
	name: "Helmet",
	description: "Simple yet reliable plate helm, favored by defenders of the realm.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NgJyJCDG-1UEccRymvT?alt=media&token=d41ffc74-1619-449d-b7a6-227b3cb71835",
	price: 20,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
