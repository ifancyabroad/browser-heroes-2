import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "horrifying_visage",
	name: "Horrifying Visage",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJ8msAkFt_vFDtrW5T?alt=media&token=7928e940-5f79-4395-8961-55a901f83713",
	pool: "common",
	category: "debuff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "strength",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "dexterity",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "constitution",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "intelligence",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
	],
	tags: [],
});
