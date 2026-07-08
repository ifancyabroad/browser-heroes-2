import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crushing_fist",
	name: "Crushing Fist",
	description: "Unleash a mighty fist, pulverizing enemies with ethereal power.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh5ROOn89jDWYu49HW?alt=media&token=f5d32b27-11b4-4518-8392-d649d50bdf81",
	pool: "warlock",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d12+8",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 1,
		},
	],
	tags: [],
});
