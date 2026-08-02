import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crushing_fist",
	name: "Crushing Fist",
	description: "Unleash a mighty fist, pulverizing enemies with ethereal power.",
	icon: "skills/warlock/crushing_fist.png",
	pool: "warlock",
	kind: "spell",
	category: "damage",
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
