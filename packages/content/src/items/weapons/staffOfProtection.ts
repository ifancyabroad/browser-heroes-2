import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_protection",
	name: "Staff of Protection",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OIMXPphDGKT4i3csv4K?alt=media&token=ef2cae9e-db75-4cf7-84db-b423337b8d40",
	price: 1360,
	rarity: "epic",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+3",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 6,
		},
	],
	attackRiders: [],
	tags: [],
});
