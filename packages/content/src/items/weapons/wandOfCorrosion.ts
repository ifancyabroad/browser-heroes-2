import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "acid",
	description: "",
	effects: [
		{
			difficulty: 19,
			duration: 3,
			modifier: "constitution",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OF7k8J8rp5dofXywACI?alt=media&token=7ceabef1-aebc-4753-a7b2-60585b11553c",
	level: 2,
	max: 5,
	min: 2,
	name: "Wand of Corrosion",
	price: 200,
	properties: [
		{
			name: "acid",
			type: "damage",
			value: 20,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "wand_of_corrosion",
});
