import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "holy_bolt",
	name: "Holy Bolt",
	description: "Hurl a focused bolt of radiant energy with divine precision.",
	icon: "skills/cleric/holy_bolt.png",
	pool: "cleric",
	kind: "prayer",
	category: "damage",
	rarity: "common",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "1d10",
			attribute: "wisdom",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
