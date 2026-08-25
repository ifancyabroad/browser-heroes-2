import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fireball",
	name: "Fireball",
	description: "Hurl an explosive ball of flame that continues to burn the enemy.",
	icon: "skills/warlock/fireball.png",
	pool: "warlock",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "magical",
			dice: "4d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "fire",
			damageClass: "magical",
			dice: "1d6",
			duration: { unit: "turns", value: 2 },
		},
	],
	tags: [],
});
