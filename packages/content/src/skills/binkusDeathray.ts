import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "binkus_deathray",
	name: "Binkus' Deathray",
	description: "Unleash a singular beam of annihilating fire and necrotic energy.",
	icon: "skills/unique/binkus_deathray.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "8d10",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "8d10",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
