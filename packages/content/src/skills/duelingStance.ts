import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dueling_stance",
	name: "Dueling Stance",
	description: "Adopt a defensive posture that improves armour at the cost of weapon damage.",
	icon: "skills/warrior/dueling_stance.png",
	pool: "warrior",
	kind: "technique",
	category: "defensive",
	maxUses: 5,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 5,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "slashing",
			operation: "multiply",
			value: 0.75,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "multiply",
			value: 0.75,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "piercing",
			operation: "multiply",
			value: 0.75,
			durationTurns: 4,
		},
	],
	tags: [],
});
