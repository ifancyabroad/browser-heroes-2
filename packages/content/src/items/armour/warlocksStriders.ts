import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warlocks_striders",
	name: "Warlock's Striders",
	description: "Warlock's Striders designed for comfort and mystical energy absorption.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDM2ApQWMggqJzd1Oj?alt=media&token=14c5b834-aaa3-4d82-8cf9-460aec1a16d5",
	price: 280,
	rarity: "common",
	type: "armour",
	slot: "boots",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
