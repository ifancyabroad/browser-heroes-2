import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rage",
	name: "Rage",
	description:
		"Tap into raw fury to amplify physical damage and shrug off blows at the cost of defense.",
	icon: "skills/barbarian/rage.png",
	pool: "barbarian",
	kind: "technique",
	category: "buff",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "slashing",
			operation: "multiply",
			value: 1.5,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "multiply",
			value: 1.5,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "piercing",
			operation: "multiply",
			value: 1.5,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -3,
			durationTurns: 4,
		},
		{
			type: "modifyDamageTaken",
			target: "self",
			operation: "multiply",
			value: 0.75,
			durationTurns: 4,
		},
	],
	tags: [],
});
