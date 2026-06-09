import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "bascinet",
	name: "Bascinet",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEJs3RCx4H78EqaGTc?alt=media&token=50f252da-83d7-4134-ac19-c32c1abb5950",
	price: 300,
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
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
	],
	tags: [],
});
