import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Molten Crusher is a heavy hammer with a glowing, lava-like head that radiates intense heat. Designed for devastating strikes, it can crush armor and ignite foes upon contact. Favored by fire-infused warriors, this hammer embodies the fury of molten rock in battle.",
	effects: [
		{
			damageType: "fire",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 17,
			duration: 4,
			modifier: "constitution",
			properties: [
				{
					name: "fire",
					type: "resistance",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O83DUGFC8-nlyahHmlf?alt=media&token=56478ba1-6d8d-4440-a0c7-ca8840e3de6b",
	level: 4,
	max: 9,
	min: 4,
	name: "Molten Crusher",
	price: 1120,
	size: "oneHanded",
	type: "weapon",
	weaponType: "hammer",
	id: "molten_crusher",
});
