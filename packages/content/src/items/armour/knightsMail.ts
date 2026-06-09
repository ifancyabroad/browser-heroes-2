import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "knights_mail",
	name: "Knight's Mail",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8HsoUz7NkxyEkUN6c2?alt=media&token=ad65bca3-b84d-4219-9486-4f2f3e6b5e84",
	price: 1560,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 15,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 2,
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
