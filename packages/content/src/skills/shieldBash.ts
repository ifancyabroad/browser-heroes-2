import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shield_bash",
	name: "Shield Bash",
	description:
		"Deal crushing damage to the enemy. A failed Constitution saving throw also stuns them.",
	icon: "skills/common/shield_bash.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "melee",
			dice: "3d8",
			attribute: "strength",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: { attribute: "strength" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
