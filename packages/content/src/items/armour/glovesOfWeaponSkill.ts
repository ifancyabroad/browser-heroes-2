import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gloves_of_weapon_skill",
	name: "Gloves of Weapon Skill",
	description: "Gloves that empower the wearer with unparalleled weapon expertise.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDUFkHJg969i8Fdv_B?alt=media&token=fc0ea003-8434-4a9c-9e2c-6a00ecc7c459",
	price: 350,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
