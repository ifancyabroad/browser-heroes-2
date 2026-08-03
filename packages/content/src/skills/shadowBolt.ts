import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadow_bolt",
	name: "Shadow Bolt",
	description: "Hurl a precise bolt of concentrated shadow at the enemy.",
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
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
