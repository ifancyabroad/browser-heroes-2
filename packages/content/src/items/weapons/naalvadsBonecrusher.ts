import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	effects: [
		{
			difficulty: 24,
			duration: 2,
			modifier: "constitution",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -6,
				},
				{
					name: "crushing",
					type: "resistance",
					value: -40,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OCjclL2ykXga6TDYLQX?alt=media&token=63e7045d-ac70-42a6-a88d-93c96a13975d",
	level: 5,
	max: 15,
	min: 9,
	name: "Naalvad's Bonecrusher",
	price: 2540,
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 4,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "mace",
	id: "naalvads_bonecrusher",
});
