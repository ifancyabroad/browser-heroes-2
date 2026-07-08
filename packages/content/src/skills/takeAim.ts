import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "take_aim",
	name: "Take Aim",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-I-fGj92SL-q-oVdg?alt=media&token=fea4cf2a-726e-4526-b795-42b115e42305",
	pool: "common",
	category: "buff",
	maxUses: 8,
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
