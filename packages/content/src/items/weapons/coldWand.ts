import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "cold",
	description:
		"The Cold Wand is a slender, ice-blue rod imbued with frost magic, chilling the air around it. When activated, it releases blasts of freezing energy, capable of slowing enemies or encasing them in ice.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O885N2_iJ4G2FzUXbNw?alt=media&token=9a27d4ed-9e5b-4540-a423-78fafb03a05a",
	level: 1,
	max: 4,
	min: 1,
	name: "Cold Wand",
	price: 60,
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "cold_wand",
});
