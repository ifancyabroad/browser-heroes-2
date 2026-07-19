import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "molten_crusher",
	name: "Molten Crusher",
	description:
		"The Molten Crusher is a heavy hammer with a glowing, lava-like head that radiates intense heat. Designed for devastating strikes, it can crush armor and ignite foes upon contact. Favored by fire-infused warriors, this hammer embodies the fury of molten rock in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O83DUGFC8-nlyahHmlf?alt=media&token=56478ba1-6d8d-4440-a0c7-ca8840e3de6b",
	price: 1120,
	rarity: "legendary",
	type: "weapon",
	weaponType: "hammer",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+3",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d8",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 17,
					attribute: "constitution",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamageTaken",
					target: "enemy",
					operation: "multiply",
					value: 1.25,
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
