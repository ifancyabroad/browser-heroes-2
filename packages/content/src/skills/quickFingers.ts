import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description: "Prepare to attack with great speed, increasing critical strike chance.",
	effects: [
		{
			accuracy: 100,
			duration: 8,
			properties: [
				{
					name: "critChance",
					type: "auxiliaryStat",
					value: 5,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZq_C6vPLiGUFkYHy3u?alt=media&token=95e81572-3538-4686-bde3-70eaa9eeb15d",
	level: 1,
	maxUses: 8,
	name: "Quick Fingers",
	price: 60,
	id: "quick_fingers",
});
