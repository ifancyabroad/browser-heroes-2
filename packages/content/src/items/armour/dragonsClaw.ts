import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragons_claw",
	name: "Dragon's Claw",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1LVA9SRog9Ilt_z2i?alt=media&token=f80488e4-ae57-4d22-82bd-56436108f255",
	price: 1680,
	rarity: "common",
	type: "armour",
	slot: "ring",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 4,
		},
	],
	tags: [],
});
