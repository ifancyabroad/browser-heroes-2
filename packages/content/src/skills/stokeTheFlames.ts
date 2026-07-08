import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "stoke_the_flames",
	name: "Stoke the Flames",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OA7zdXDv3eGxenwra8y?alt=media&token=d0758678-8c24-457e-a357-e3c3221df9d5",
	pool: "unique",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "add",
			value: 40,
			durationTurns: 4,
		},
	],
	tags: [],
});
