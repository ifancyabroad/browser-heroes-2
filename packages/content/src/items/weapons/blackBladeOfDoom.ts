import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Black Blade of Doom is a dark, menacing sword with a jet-black blade that seems to absorb light. Infused with malevolent energy, it curses those it strikes, sowing despair among enemies. This blade is favored by dark warriors and necromancers seeking to unleash chaos and destruction.",
	effects: [
		{
			damageType: "fire",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NNwRG-llD60pf8sSKeM?alt=media&token=de76b657-3136-49fc-aaa2-b619a0a2d381",
	level: 4,
	max: 14,
	min: 8,
	name: "Black Blade of Doom",
	price: 1720,
	properties: [
		{
			name: "fire",
			type: "damage",
			value: 50,
		},
		{
			name: "fire",
			type: "resistance",
			value: 50,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "sword",
	id: "black_blade_of_doom",
});
