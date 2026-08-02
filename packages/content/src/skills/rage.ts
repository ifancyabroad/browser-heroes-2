import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rage",
	name: "Rage",
	description: "Tap into raw fury to amplify physical power and deal greater damage.",
	icon: "skills/barbarian/rage.png",
	pool: "barbarian",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "slashing",
			operation: "add",
			value: 50,
			durationTurns: 8,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "add",
			value: 50,
			durationTurns: 8,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "piercing",
			operation: "add",
			value: 50,
			durationTurns: 8,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 8,
		},
	],
	tags: [],
});
