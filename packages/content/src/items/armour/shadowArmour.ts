import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shadow_armour",
	name: "Shadow Armour",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8DBv36AD0X67CEQK-t?alt=media&token=008c4fe4-745e-4df7-aeab-8b383d17b6fa",
	price: 800,
	rarity: "rare",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 11,
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 20,
		},
	],
	tags: [],
});
