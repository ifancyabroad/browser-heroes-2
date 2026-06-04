import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Staff of the Trickster is a slender rod adorned with playful symbols and a shimmering gemstone. It enhances illusion spells, allowing the wielder to confuse foes. Favored by cunning spellcasters, this staff is perfect for those who thrive on deception in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O880XFcKnWhE-_xBLH5?alt=media&token=01951d9c-ed50-4071-8e62-b3a41d72a602",
	level: 2,
	max: 9,
	min: 2,
	name: "Staff of the Trickster",
	price: 220,
	properties: [
		{
			name: "charisma",
			type: "stat",
			value: 2,
		},
		{
			name: "fire",
			type: "damage",
			value: 20,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "staff_of_the_trickster",
});
