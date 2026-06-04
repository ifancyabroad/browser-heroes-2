import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Gold Dagger features a gleaming golden blade with an ornate hilt, combining beauty and functionality. Its design allows for swift, precise strikes, making it a favored choice among nobles and skilled assassins who appreciate both luxury and lethality.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86upm1evShQs6BJMoJ?alt=media&token=62166ff9-9d4b-418c-8035-783746af2961",
	level: 3,
	max: 6,
	min: 3,
	name: "Gold Dagger",
	price: 580,
	properties: [
		{
			name: "critChance",
			type: "auxiliaryStat",
			value: 3,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "gold_dagger",
});
