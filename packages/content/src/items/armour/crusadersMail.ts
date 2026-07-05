import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "crusaders_mail",
	name: "Crusader's Mail",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8HsQRUtV5enlZ3MShV?alt=media&token=66eb7b95-29a9-4b0d-a1e2-1f222cfdb9fd",
	price: 620,
	rarity: "rare",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 14,
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
