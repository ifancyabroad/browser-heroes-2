import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "crushing",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "fire",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCK-_ujmbDbdHYgCnl_?alt=media&token=0e48f595-2b40-4ab2-96f9-57c5746d6380",
	level: 4,
	maxUses: 4,
	name: "Flame Slam",
	price: 0,
	id: "flame_slam",
});
