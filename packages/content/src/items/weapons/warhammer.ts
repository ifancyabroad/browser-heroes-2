import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "warhammer",
	name: "Warhammer",
	description:
		"The Warhammer is a heavy, blunt weapon with a broad, flat head for powerful strikes. Its sturdy handle allows for strong blows, making it effective against armored foes and a favorite among warriors for its devastating impact in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK07SpTQiVML_pBgQ4?alt=media&token=28026b31-3cf7-4b80-a9c0-3f5a1560f120",
	price: 80,
	rarity: "common",
	type: "weapon",
	weaponType: "hammer",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
