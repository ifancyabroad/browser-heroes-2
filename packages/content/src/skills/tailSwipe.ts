import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tail_swipe",
	name: "Tail Swipe",
	description:
		"Deal crushing damage to the enemy, halved on a successful Dexterity saving throw. A separate failed Dexterity saving throw stuns them for 1 turn.",
	icon: "skills/common/tail_swipe.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 3,
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
				attribute: "dexterity",
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
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
