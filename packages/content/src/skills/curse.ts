import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "curse",
	name: "Curse",
	description:
		"Inflict a debilitating curse that forces the enemy to fail all saving throws, leaving them vulnerable.",
	icon: "skills/occultist/curse.png",
	pool: "occultist",
	category: "debuff",
	maxUses: 8,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 6,
		},
	],
	tags: [],
});
