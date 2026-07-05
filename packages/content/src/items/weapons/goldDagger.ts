import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "gold_dagger",
	name: "Gold Dagger",
	description:
		"The Gold Dagger features a gleaming golden blade with an ornate hilt, combining beauty and functionality. Its design allows for swift, precise strikes, making it a favored choice among nobles and skilled assassins who appreciate both luxury and lethality.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86upm1evShQs6BJMoJ?alt=media&token=62166ff9-9d4b-418c-8035-783746af2961",
	price: 580,
	rarity: "rare",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+2",
		type: "slashing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 3,
		},
	],
	attackRiders: [],
	tags: [],
});
