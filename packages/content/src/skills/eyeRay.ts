import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "eye_ray",
	name: "Eye Ray",
	description:
		"Project a debilitating ray that ravages the enemy's mind and may leave them blinded or helpless.",
	icon: "skills/unique/eye_ray.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 6,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "5d10",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
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
				dc: { attribute: "intelligence", includeProficiency: false },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
