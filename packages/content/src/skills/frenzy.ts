import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frenzy",
	name: "Frenzy",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eQinII0AhDAXshQjR?alt=media&token=d363d059-dc53-4296-9320-e15b90b39722",
	pool: "common",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
			durationTurns: 4,
		},
	],
	tags: [],
});
