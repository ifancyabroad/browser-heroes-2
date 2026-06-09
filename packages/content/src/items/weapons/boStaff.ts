import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "bo_staff",
	name: "Bo Staff",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OI6XABb86ffAJIOt5Zr?alt=media&token=96f1c1b9-aeb0-4f1f-9f56-ee955c7a6c99",
	price: 560,
	rarity: "common",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+2",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
