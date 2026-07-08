import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "doom_song",
	name: "Doom Song",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9enw-PYC96nmN7s5Sh?alt=media&token=9b911c40-20eb-47f8-b556-dacaadec84e7",
	pool: "unique",
	category: "debuff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "constitution",
			operation: "add",
			value: -10,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "attackRollBonus",
			operation: "add",
			value: -2,
			durationTurns: 4,
		},
	],
	tags: [],
});
