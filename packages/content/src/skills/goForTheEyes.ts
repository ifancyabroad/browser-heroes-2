import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "go_for_the_eyes",
	name: "Go For The Eyes",
	description: "Aim for the opponents eyes with a chance to temporarily blind them.",
	icon: "skills/rogue/go_for_the_eyes.png",
	pool: "rogue",
	category: "attack",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "modifyDamage",
							target: "enemy",
							operation: "multiply",
							value: 0.75,
							durationTurns: 1,
						},
					],
				},
			],
		},
	],
	tags: [],
});
