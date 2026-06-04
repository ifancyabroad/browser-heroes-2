import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			duration: 3,
			properties: [
				{
					name: "piercing",
					type: "damage",
					value: 20,
				},
			],
			target: "self",
			type: "status",
		},
		{
			duration: 3,
			effect: "frenzy",
			target: "self",
			type: "auxiliary",
		},
		{
			duration: 3,
			effect: "haste",
			target: "self",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3XVsmOpd2YZFCQP6r?alt=media&token=a941ad22-8422-4826-8eb5-e93c15fc8bfb",
	level: 3,
	maxUses: 1,
	name: "Detect Blood",
	price: 0,
	id: "detect_blood",
});
