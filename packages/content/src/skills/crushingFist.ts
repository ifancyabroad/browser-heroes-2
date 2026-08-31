import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crushing_fist",
	name: "Crushing Fist",
	description: "Unleash a mighty fist, pulverizing enemies with ethereal power.",
	icon: "skills/warlock/crushing_fist.png",
	pool: "warlock",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "magical",
			dice: "4d8",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
