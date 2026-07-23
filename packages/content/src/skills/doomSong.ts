import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "doom_song",
	name: "Doom Song",
	icon: "skills/unique/doom_song.png",
	pool: "unique",
	category: "debuff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "maxHpBonus",
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
