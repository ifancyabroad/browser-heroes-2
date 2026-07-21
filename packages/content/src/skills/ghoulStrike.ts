import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ghoul_strike",
	name: "Ghoul Strike",
	icon: "skills/unique/ghoul_strike.png",
	pool: "unique",
	category: "attack",
	maxUses: 3,
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
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							durationTurns: 1,
						},
					],
				},
			],
		},
	],
	tags: [],
});
