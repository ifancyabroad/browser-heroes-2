import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "stand_ground",
	name: "Stand Ground",
	description: "Stand your ground to greatly increase defenses but reduce mobility.",
	icon: "skills/warrior/stand_ground.png",
	pool: "warrior",
	kind: "technique",
	category: "defensive",
	maxUses: 5,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			durationTurns: 6,
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 6,
		},
	],
	tags: [],
});
