import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "Attempt to disarm the enemy.",
	effects: [
		{
			accuracy: 75,
			difficulty: 18,
			duration: 3,
			effect: "disarm",
			modifier: "strength",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqUxJ5hBOkYc_e-wuG?alt=media&token=0a58571b-84fa-4b18-9ae1-ef62ca3bdd2d",
	level: 3,
	maxUses: 3,
	name: "Disarm",
	price: 400,
	id: "disarm",
});
