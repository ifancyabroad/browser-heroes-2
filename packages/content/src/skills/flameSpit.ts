import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_spit",
	name: "Flame Spit",
	description: "Deal fire damage to the enemy.",
	icon: "skills/common/flame_spit.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "other",
			attackRange: "ranged",
			dice: "8d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
