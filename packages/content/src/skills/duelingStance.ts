import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dueling_stance",
	name: "Dueling Stance",
	description: "Adopt a balanced fighting posture that improves both defense and weapon damage.",
	icon: "skills/warrior/dueling_stance.png",
	pool: "warrior",
	kind: "technique",
	category: "buff",
	maxUses: 5,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 3,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "slashing",
			operation: "multiply",
			value: 1.35,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "multiply",
			value: 1.35,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "piercing",
			operation: "multiply",
			value: 1.35,
			durationTurns: 4,
		},
	],
	tags: [],
});
