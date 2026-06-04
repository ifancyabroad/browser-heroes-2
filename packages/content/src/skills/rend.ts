import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description: "Strike the enemy to pierce the skin and cause them to bleed.",
	effects: [
		{
			difficulty: 18,
			duration: 3,
			effect: "bleed",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NJQ2hml_9m6iHzAfES5?alt=media&token=5e94443d-b8ce-4bb2-9f9f-4eb6c8197469",
	level: 1,
	maxUses: 4,
	name: "Rend",
	price: 50,
	target: "enemy",
	id: "rend",
});
