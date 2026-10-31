import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sunbeam",
	name: "Sunbeam",
	description:
		"Deal radiant damage to the enemy, halved on a successful Constitution saving throw. A separate failed Constitution saving throw gives them disadvantage on attack rolls for 2 turns.",
	icon: "skills/common/sunbeam.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "6d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
