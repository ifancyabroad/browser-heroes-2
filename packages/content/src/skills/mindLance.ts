import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "mind_lance",
	name: "Mind Lance",
	description: "Deal necrotic damage to the enemy, halved on a successful Wisdom saving throw.",
	icon: "skills/common/psionic_blast.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "2d8",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "halfDamage",
				dc: {
					attribute: "intelligence",
				},
			},
		},
	],
	tags: [],
});
