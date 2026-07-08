import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_minor_wounds",
	name: "Cure Minor Wounds",
	description: "Restore a small amount of health to aid in recovery from minor injuries.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTQlY-RMpBaNkunfb7?alt=media&token=cdc6656e-ac5c-4366-a65f-6c4025c17ac0",
	pool: "cleric",
	category: "heal",
	maxUses: 2,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "1d8+3",
			attribute: "wisdom",
		},
	],
	tags: [],
});
