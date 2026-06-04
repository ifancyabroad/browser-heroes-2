import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Boneclub is a crude weapon crafted from a single large bone, often from a beast of considerable size. Its surface is rough and jagged, adding to its blunt force when swung. Primitive but effective, it’s favored by those who embrace a raw, untamed fighting style.",
	effects: [
		{
			difficulty: 12,
			duration: 4,
			modifier: "constitution",
			properties: [
				{
					name: "crushing",
					type: "resistance",
					value: -20,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O838EeKMsy_Xw7WPyND?alt=media&token=12b74f85-8519-4eb3-b78f-ad018ae687eb",
	level: 1,
	max: 6,
	min: 1,
	name: "Boneclub",
	price: 40,
	properties: [
		{
			name: "charisma",
			type: "stat",
			value: -2,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "club",
	id: "boneclub",
});
