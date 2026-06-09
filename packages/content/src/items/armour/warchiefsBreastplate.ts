import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warchiefs_breastplate",
	name: "Warchief's Breastplate",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I4QK7JVSMY6p__i3L?alt=media&token=444ba759-2ff5-4f6c-bb78-df49c35f2a0b",
	price: 550,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 16,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 1,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 20,
		},
	],
	tags: [],
});
