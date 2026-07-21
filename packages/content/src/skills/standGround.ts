import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "stand_ground",
	name: "Stand Ground",
	description: "Stand your ground to greatly increase defenses but reduce mobility.",
	icon: "skills/warrior/stand_ground.png",
	pool: "warrior",
	category: "buff",
	maxUses: 6,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			durationTurns: 8,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			durationTurns: 8,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			durationTurns: 8,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "dexterity",
			operation: "add",
			value: -2,
			durationTurns: 8,
		},
	],
	tags: [],
});
