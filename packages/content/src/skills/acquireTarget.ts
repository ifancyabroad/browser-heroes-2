import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acquire_target",
	name: "Acquire Target",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OBGS9HEr6Mb0wEKjYLh?alt=media&token=a0a2a938-e0a7-4952-96f9-957691195c98",
	pool: "unique",
	category: "buff",
	maxUses: 6,
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
