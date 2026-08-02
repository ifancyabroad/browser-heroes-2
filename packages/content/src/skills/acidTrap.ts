import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_trap",
	name: "Acid Trap",
	description: "Spring a caustic snare that can pin the enemy and expose them to acid.",
	icon: "skills/rogue/acid_trap.png",
	pool: "rogue",
	kind: "technique",
	category: "debuff",
	maxUses: 3,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 1,
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
			durationTurns: 4,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
