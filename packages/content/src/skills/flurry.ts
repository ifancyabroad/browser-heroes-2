import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flurry",
	name: "Flurry",
	description: "Unleash a rapid series of strikes, overwhelming your enemy with speed and force.",
	icon: "skills/rogue/flurry.png",
	pool: "rogue",
	category: "attack",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
	],
	tags: [],
});
