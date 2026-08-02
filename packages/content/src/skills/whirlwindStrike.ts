import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "whirlwind_strike",
	name: "Whirlwind Strike",
	description:
		"Unleash a flurry of attacks in a spinning motion, hitting your foe three times in quick succession.",
	icon: "skills/barbarian/whirlwind_strike.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.75,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.75,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.75,
			attackRiders: [],
		},
	],
	tags: [],
});
