import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description: "",
	effects: [
		{
			max: 6,
			min: 1,
			target: "self",
			type: "heal",
		},
		{
			difficulty: 24,
			duration: 2,
			modifier: "constitution",
			properties: [
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
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OCjb2zwjZOd3F8wf8Xa?alt=media&token=760f02f1-a8fd-456c-8903-aad88daba274",
	level: 5,
	max: 9,
	min: 6,
	name: "Vorshak's Embrace",
	price: 2250,
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "vorshaks_embrace",
});
