import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_trap",
	name: "Acid Trap",
	description:
		"Deal piercing and acid damage to the enemy, each halved on a successful Dexterity saving throw. A separate failed Dexterity saving throw stuns them for 2 turns, and a failed Constitution saving throw makes them vulnerable to acid damage for the current battle.",
	icon: "skills/thief/acid_trap.png",
	pool: "thief",
	kind: "technique",
	category: "debuff",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			damageClass: "physical",
			dice: "2d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			damageClass: "other",
			dice: "2d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "acid",
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
