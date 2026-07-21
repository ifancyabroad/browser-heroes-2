import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "charge",
	name: "Charge",
	description: "Sprint towards the enemy catching them off guard with a chance to stun.",
	icon: "skills/barbarian/charge.png",
	pool: "barbarian",
	category: "attack",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
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
