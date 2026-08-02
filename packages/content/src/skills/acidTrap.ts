import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_trap",
	name: "Acid Trap",
	description: "Trap your enemy to incapacitate them and reduce their defenses.",
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
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "acid",
			durationTurns: 5,
		},
	],
	tags: [],
});
