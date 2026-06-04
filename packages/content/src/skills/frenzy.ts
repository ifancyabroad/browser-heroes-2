import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			duration: 4,
			effect: "frenzy",
			target: "self",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eQinII0AhDAXshQjR?alt=media&token=d363d059-dc53-4296-9320-e15b90b39722",
	level: 3,
	maxUses: 1,
	name: "Frenzy",
	price: 0,
	id: "frenzy",
});
