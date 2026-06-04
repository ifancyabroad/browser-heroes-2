import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "poison",
	description: "",
	effects: [
		{
			difficulty: 16,
			duration: 2,
			effect: "poison",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAt06i5FZejZc6JogoT?alt=media&token=159f7546-ec58-461e-9e02-ac18c8517b32",
	level: 2,
	max: 5,
	min: 2,
	name: "Snake Tongue",
	price: 220,
	properties: [
		{
			name: "poison",
			type: "damage",
			value: 20,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "snake_tongue",
});
