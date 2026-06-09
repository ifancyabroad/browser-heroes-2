import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "cold_wand",
	name: "Cold Wand",
	description:
		"The Cold Wand is a slender, ice-blue rod imbued with frost magic, chilling the air around it. When activated, it releases blasts of freezing energy, capable of slowing enemies or encasing them in ice.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O885N2_iJ4G2FzUXbNw?alt=media&token=9a27d4ed-9e5b-4540-a423-78fafb03a05a",
	price: 60,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4",
		type: "cold",
		attribute: "intelligence",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
