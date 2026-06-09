import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "handaxe",
	name: "Handaxe",
	description:
		"The Handaxe is a versatile, one-handed weapon with a sharp, curved blade and a sturdy handle. Lightweight and easy to wield, it excels in both melee combat and as a throwing weapon. Common among adventurers, it serves well for both combat and practical tasks like chopping wood.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK-VVeMfZnyRzNuNyK?alt=media&token=1860a772-2dba-423c-a98e-c72a50f4a751",
	price: 50,
	rarity: "common",
	type: "weapon",
	weaponType: "axe",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
