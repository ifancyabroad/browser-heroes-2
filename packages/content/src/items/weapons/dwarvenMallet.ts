import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "dwarven_mallet",
	name: "Dwarven Mallet",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsgwpOgJdx0pEfQrbR?alt=media&token=5e6e0054-f988-4196-8835-ab8ad9886dfa",
	price: 230,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "hammer",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+1",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: [],
});
