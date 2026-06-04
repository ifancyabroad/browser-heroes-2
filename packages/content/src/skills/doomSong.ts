import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			difficulty: 14,
			duration: 4,
			modifier: "wisdom",
			properties: [
				{
					name: "constitution",
					type: "stat",
					value: -10,
				},
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: -10,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9enw-PYC96nmN7s5Sh?alt=media&token=9b911c40-20eb-47f8-b556-dacaadec84e7",
	level: 4,
	maxUses: 1,
	name: "Doom Song",
	price: 0,
	id: "doom_song",
});
