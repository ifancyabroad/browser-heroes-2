import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			duration: 4,
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: 4,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-I-fGj92SL-q-oVdg?alt=media&token=fea4cf2a-726e-4526-b795-42b115e42305",
	level: 1,
	maxUses: 8,
	name: "Take Aim",
	price: 0,
	id: "take_aim",
});
