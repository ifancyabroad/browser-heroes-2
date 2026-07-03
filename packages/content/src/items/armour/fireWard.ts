import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "fire_ward",
	name: "Fire Ward",
	description: "A shield emanating a protective aura of fire, shielding its wielder from harm.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEcPdzcDO_PG86-m7P?alt=media&token=a609b946-9e57-4e4d-9f7f-692be2d31dfe",
	price: 300,
	rarity: "common",
	type: "armour",
	slot: "shield",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
	],
	tags: [],
});
