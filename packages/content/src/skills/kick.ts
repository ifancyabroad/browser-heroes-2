import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "kick",
	name: "Kick",
	description:
		"Deal crushing damage to the enemy, halved on a successful Strength saving throw. A separate failed Strength saving throw stuns them for 1 turn.",
	icon: "skills/thief/kick.png",
	pool: "thief",
	kind: "technique",
	category: "debuff",
	rarity: "common",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "melee",
			dice: "1d4",
			attribute: "dexterity",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
