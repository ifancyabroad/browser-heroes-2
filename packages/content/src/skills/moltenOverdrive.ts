import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "molten_overdrive",
	name: "Molten Overdrive",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCK1lVEhQnzlaTAST3j?alt=media&token=7979c186-71db-4fd9-9147-1b0bf2479ca7",
	pool: "unique",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
			durationTurns: 6,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "critChance",
			operation: "add",
			value: 5,
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "add",
			value: 50,
			durationTurns: 6,
		},
	],
	tags: [],
});
