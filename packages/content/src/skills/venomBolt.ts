import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "venom_bolt",
	name: "Venom Bolt",
	description: "Make a ranged attack that deals poison damage.",
	icon: "skills/common/venom_bolt.png",
	pool: "common",
	kind: "spellAttack",
	category: "damage",
	rarity: "common",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "poison",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
