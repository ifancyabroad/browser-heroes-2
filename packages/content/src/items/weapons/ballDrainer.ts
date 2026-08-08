import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "ball_drainer",
	name: "Ball Drainer",
	description:
		"A cruel spiked flail that channels the force of every impact into its wielder, siphoning vitality from those it crushes.",
	icon: "items/weapons/clubs/Club_v2_20.png",
	price: 1380,
	rarity: "legendary",
	type: "weapon",
	weaponType: "flail",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d8+4",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
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
					damageType: "necrotic",
					dice: "1d6",
					requiresAttackRoll: false,
				},
				{
					type: "heal",
					target: "self",
					dice: "1d6",
				},
			],
		},
	],
	tags: [],
});
