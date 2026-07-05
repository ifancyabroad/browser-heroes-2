import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "holy_staff",
	name: "Holy Staff",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OIMLXg0JszLaTsPa2ad?alt=media&token=9e75c817-b42b-4ddf-8dd1-fef681fd313e",
	price: 620,
	rarity: "rare",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+2",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "healingMultiplier",
			operation: "add",
			value: 40,
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
