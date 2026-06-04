import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description:
		"Manipulate your foe with deceptive tactics, charming them into possibly turning their attacks on themselves.",
	effects: [
		{
			difficulty: 19,
			duration: 4,
			effect: "charm",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI1V0XtHIyPF14LC8N2?alt=media&token=725a9b62-6b5c-4e3f-aa3f-833d9e0c9b7d",
	level: 4,
	maxUses: 2,
	name: "Cruel Deception",
	price: 0,
	id: "cruel_deception",
});
