import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rend",
	name: "Rend",
	description: "Strike the enemy to pierce the skin and cause them to bleed.",
	icon: "skills/warrior/rend.png",
	pool: "warrior",
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
