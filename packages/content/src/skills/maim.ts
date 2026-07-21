import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "maim",
	name: "Maim",
	description: "Strike with brutal force, causing bleeding and a chance to disarm your opponent.",
	icon: "skills/assassin/maim.png",
	pool: "assassin",
	category: "attack",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "modifyDamage",
							target: "enemy",
							operation: "multiply",
							value: 0.75,
							durationTurns: 3,
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							dice: "1d4",
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
