import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reposition",
	name: "Reposition",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9_cea1qIQBNQ3ncod_?alt=media&token=0b715183-560d-4152-a792-aba05400eff2",
	pool: "common",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
			durationTurns: 3,
		},
	],
	tags: [],
});
