import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_the_trickster",
	name: "Staff of the Trickster",
	description:
		"The Staff of the Trickster is a slender rod adorned with playful symbols and a shimmering gemstone. It enhances illusion spells, allowing the wielder to confuse foes. Favored by cunning spellcasters, this staff is perfect for those who thrive on deception in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O880XFcKnWhE-_xBLH5?alt=media&token=01951d9c-ed50-4071-8e62-b3a41d72a602",
	price: 220,
	rarity: "common",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+1",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: [],
});
