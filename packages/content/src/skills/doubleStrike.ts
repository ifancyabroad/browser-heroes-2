import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description: "Execute two rapid attacks in quick succession against a single target.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTnzsxBYgTye5lFfkd?alt=media&token=51004322-ba78-44c5-9f60-332eefbdffec",
	level: 3,
	maxUses: 3,
	name: "Double Strike",
	price: 0,
	id: "double_strike",
});
