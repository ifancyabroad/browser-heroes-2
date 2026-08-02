import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "contagion",
	name: "Contagion",
	description:
		"Infect the enemy with a virulent poison, significantly increasing the damage over time as it spreads through their system.",
	icon: "skills/occultist/contagion.png",
	pool: "occultist",
	category: "debuff",
	maxUses: 2,
	effects: [
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "poison",
			dice: "1d6",
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "poison",
			operation: "add",
			value: 100,
			durationTurns: 6,
		},
	],
	tags: [],
});
