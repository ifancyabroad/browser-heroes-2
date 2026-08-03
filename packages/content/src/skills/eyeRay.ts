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
			dice: "6d6",
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
			durationTurns: 1,
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
			durationTurns: 2,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
