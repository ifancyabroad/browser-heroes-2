import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shocking_grasp",
	name: "Shocking Grasp",
	description: "Seize the enemy and discharge lightning through your grasp.",
	icon: "skills/wizard/sparks.png",
	pool: "wizard",
	kind: "spellAttack",
	category: "damage",
	rarity: "common",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			attackRange: "melee",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
