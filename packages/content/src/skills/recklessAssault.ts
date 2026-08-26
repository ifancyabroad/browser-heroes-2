import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reckless_assault",
	name: "Reckless Assault",
	description:
		"Commit everything to a devastating flame-wreathed assault, leaving yourself stunned in its aftermath.",
	icon: "skills/barbarian/reckless_assault.png",
	pool: "barbarian",
	kind: "technique",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "physical",
			attackRange: "melee",
			dice: "10d10",
			attribute: "strength",
			requiresAttackRoll: true,
		},
		{
			type: "applyStatus",
			target: "self",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
		},
	],
	tags: [],
});
