import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "infused_cold_wand",
	name: "Infused Cold Wand",
	description:
		"The Infused Cold Wand is a sleek, blue rod charged with frost magic. When wielded, it releases blasts of icy energy, freezing targets on contact. Favored by cold mages, it enhances their ability to control the battlefield with chilling precision.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O885kCSisaF4moiYC04?alt=media&token=4680c62d-035c-4a0a-b183-d40e287b9241",
	price: 120,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+1",
		type: "cold",
		attribute: "intelligence",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
