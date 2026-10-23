import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadow_bolt",
	name: "Shadow Bolt",
	description: "Make a ranged attack that deals necrotic damage.",
	icon: "skills/warlock/shadow_bolt.png",
	pool: "warlock",
	kind: "spellAttack",
	category: "damage",
	rarity: "common",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
