import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shadow_striders",
	name: "Shadow Striders",
	description: "Boots crafted for stealthy maneuvers, cloaking the wearer in shadow.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDQeyjdV8Lf92YkIdR?alt=media&token=e5ac25a8-4756-47e0-8d96-33ebfe021c9f",
	price: 790,
	rarity: "common",
	type: "armour",
	slot: "boots",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 20,
		},
	],
	tags: [],
});
