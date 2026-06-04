import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description: "",
	effects: [
		{
			damageType: "radiant",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 24,
			duration: 2,
			modifier: "constitution",
			properties: [
				{
					name: "radiant",
					type: "resistance",
					value: -40,
				},
				{
					name: "slashing",
					type: "resistance",
					value: -40,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OIMMrKm9Yzy8o6vlHAu?alt=media&token=7b5ffcc4-f18e-4995-974a-479b962d8ca7",
	level: 5,
	max: 16,
	min: 10,
	name: "Dawnbringer",
	price: 3200,
	properties: [
		{
			name: "radiant",
			type: "damage",
			value: 50,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "sword",
	id: "dawnbringer",
});
