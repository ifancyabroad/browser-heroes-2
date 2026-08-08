import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "molten_crusher",
	name: "Molten Crusher",
	description:
		"The Molten Crusher is a heavy hammer with a glowing, lava-like head that radiates intense heat. Designed for devastating strikes, it can crush armor and ignite foes upon contact. Favored by fire-infused warriors, this hammer embodies the fury of molten rock in battle.",
	icon: "items/weapons/hammers/Hammer_v2_21.png",
	price: 1120,
	rarity: "legendary",
	type: "weapon",
	weaponType: "hammer",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+4",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 5,
		},
	],
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
			timing: "onCrit",
			save: {
				attribute: "constitution",
				dc: {
					base: 18,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "fire",
					duration: { unit: "turns", value: 3 },
				},
			],
		},
	],
	tags: [],
});
