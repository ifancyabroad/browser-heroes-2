import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			difficulty: 19,
			duration: 2,
			effect: "stun",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTPv9FLqVI9cJXml2R?alt=media&token=2ef42b93-02e9-40dd-b953-a8ff22d8dacf",
	level: 3,
	maxUses: 1,
	name: "Petrifying Gaze",
	price: 0,
	id: "petrifying_gaze",
});
