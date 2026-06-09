import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "hammer",
	name: "Hammer",
	description:
		"The Hammer is a heavy, blunt weapon with a flat striking surface, typically made of metal or stone. Its straightforward design delivers powerful blows, making it effective against both foes and obstacles. Favored by warriors and craftsmen alike, it’s a reliable choice in close combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NNwPg099VI_pDe9E_Zd?alt=media&token=6a1a583c-8f1f-47d9-8105-e7a0af2ed7c6",
	price: 50,
	rarity: "common",
	type: "weapon",
	weaponType: "hammer",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
