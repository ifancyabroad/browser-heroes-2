import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description:
		"Topple adversaries with the forceful Knock Down skill, sending enemies crashing to the ground in a stunning display of power.",
	effects: [
		{
			difficulty: 14,
			duration: 2,
			effect: "stun",
			modifier: "strength",
			target: "enemy",
			type: "auxiliary",
		},
		{
			damageType: "crushing",
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgrvvBiejH010EI8ME?alt=media&token=562118d9-90e1-4dc3-91fc-3a3ca57c6ea5",
	level: 3,
	maxUses: 1,
	name: "Knock Down",
	price: 0,
	id: "knock_down",
});
