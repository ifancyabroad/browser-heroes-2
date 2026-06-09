import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "mace",
	name: "Mace",
	description:
		"The Mace is a blunt weapon with a heavy head attached to a sturdy handle, designed for delivering crushing blows. Its simple design makes it effective against armored foes. Common among foot soldiers, it excels at breaking defenses and inflicting serious damage in close combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO--jUsGrVSzpmk0lB?alt=media&token=03bd826e-b171-415c-b3b9-817a68ca3053",
	price: 50,
	rarity: "common",
	type: "weapon",
	weaponType: "mace",
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
