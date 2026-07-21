import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "heavy_strike",
	name: "Heavy Strike",
	description: "Deliver a powerful blow designed to deal significant damage to a single target.",
	icon: "skills/warrior/heavy_strike.png",
	pool: "warrior",
	category: "attack",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
			attackRiders: [],
		},
	],
	tags: [],
});
