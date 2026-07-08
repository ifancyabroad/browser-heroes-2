import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_fortitude",
	name: "Power Word: Fortitude",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTUsnh4THCA3EXJQn2?alt=media&token=182ef9a7-eb29-4876-b743-e017a3694bda",
	pool: "common",
	category: "buff",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "constitution",
			operation: "add",
			value: 10,
			durationTurns: 8,
		},
	],
	tags: [],
});
