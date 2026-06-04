import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description: "Unleash a mighty fist, pulverizing enemies with ethereal power.",
	effects: [
		{
			damageType: "crushing",
			max: 20,
			min: 8,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 16,
			duration: 1,
			effect: "stun",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh5ROOn89jDWYu49HW?alt=media&token=f5d32b27-11b4-4518-8392-d649d50bdf81",
	level: 3,
	maxUses: 4,
	name: "Crushing Fist",
	price: 0,
	id: "crushing_fist",
});
