import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reckless_assault",
	name: "Reckless Assault",
	description:
		"Throw caution aside for a devastating advantaged strike that also harms the attacker.",
	icon: "skills/barbarian/reckless_assault.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
			rollMode: "advantage",
			attackRiders: [],
		},
		{
			type: "damage",
			target: "self",
			damageType: "crushing",
			dice: "2d6",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
