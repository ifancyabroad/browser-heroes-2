import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deathly_howl",
	name: "Deathly Howl",
	description:
		"Deal necrotic damage to the enemy, halved on a successful Wisdom saving throw. A separate failed Wisdom saving throw gives them disadvantage on attack rolls for 3 turns.",
	icon: "skills/common/deathly_howl.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "6d6",
			attribute: "constitution",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
