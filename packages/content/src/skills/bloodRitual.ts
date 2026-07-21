import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "blood_ritual",
	name: "Blood Ritual",
	description:
		"Sacrifice your own vitality, causing you to bleed and take minor slashing damage, while dealing a powerful burst of necrotic damage to your foe.",
	icon: "skills/warlock/blood_ritual.png",
	pool: "warlock",
	category: "spell",
	maxUses: 1,
	effects: [
		{
			type: "damageOverTime",
			target: "self",
			damageType: "slashing",
			dice: "1d4",
			durationTurns: 4,
		},
		{
			type: "damage",
			target: "self",
			damageType: "slashing",
			dice: "1d6",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "4d12+19",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
