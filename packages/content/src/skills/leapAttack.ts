import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "leap_attack",
	name: "Leap Attack",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3_Ea2wZ_5cHuPGwB5?alt=media&token=94f7574d-1aa9-468b-8dc3-700988e623bf",
	pool: "common",
	category: "attack",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.75,
			attackRiders: [],
		},
	],
	tags: [],
});
