import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "blood_ritual",
	name: "Blood Ritual",
	description:
		"Sacrifice your own vitality, causing you to bleed and take minor slashing damage, while dealing a powerful burst of necrotic damage to your foe.",
	icon: "skills/warlock/blood_ritual.png",
	pool: "warlock",
	kind: "spell",
	category: "damage",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "damageOverTime",
			target: "self",
			damageType: "slashing",
			dice: "1d4",
			durationTurns: 3,
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
			dice: "10d10",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
