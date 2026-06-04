import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "necrotic",
	description: "",
	effects: [
		{
			difficulty: 22,
			duration: 2,
			modifier: "intelligence",
			properties: [
				{
					name: "necrotic",
					type: "resistance",
					value: -40,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			difficulty: 19,
			duration: 4,
			modifier: "intelligence",
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OEo-XG3BE5eugi3o0Zf?alt=media&token=bbaae2fb-3863-4f95-8eae-8c5db89fa48c",
	level: 5,
	max: 9,
	min: 6,
	name: "Doomseer's Wand",
	price: 2220,
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 40,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "doomseers_wand",
});
