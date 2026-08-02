import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "last_stand",
	name: "Last Stand",
	description:
		"Summon your remaining strength to recover health and temporarily bolster your physical resilience.",
	icon: "skills/warrior/last_stand.png",
	pool: "warrior",
	category: "heal",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			durationTurns: 2,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			durationTurns: 2,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			durationTurns: 2,
		},
		{
			type: "heal",
			target: "self",
			dice: "20d6",
		},
	],
	tags: [],
});
