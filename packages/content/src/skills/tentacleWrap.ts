import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tentacle_wrap",
	name: "Tentacle Wrap",
	description:
		"Wrap the enemy in a powerful tentacle, crushing and potentially immobilising them.",
	icon: "skills/common/tentacle_wrap.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "melee",
			dice: "6d8",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "strength",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
