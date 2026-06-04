import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description: "Restore a small amount of health to aid in recovery from minor injuries.",
	effects: [
		{
			max: 10,
			min: 4,
			modifier: "wisdom",
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTQlY-RMpBaNkunfb7?alt=media&token=cdc6656e-ac5c-4366-a65f-6c4025c17ac0",
	level: 1,
	maxUses: 2,
	name: "Cure Minor Wounds",
	price: 0,
	id: "cure_minor_wounds",
});
