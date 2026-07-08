import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "double_strike",
	name: "Double Strike",
	description: "Execute two rapid attacks in quick succession against a single target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTnzsxBYgTye5lFfkd?alt=media&token=51004322-ba78-44c5-9f60-332eefbdffec",
	pool: "warrior",
	category: "attack",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [],
		},
	],
	tags: [],
});
