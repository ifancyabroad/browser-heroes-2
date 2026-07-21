import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crushing_blow",
	name: "Crushing Blow",
	icon: "skills/barbarian/crushing_blow.png",
	pool: "barbarian",
	category: "attack",
	maxUses: 7,
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
							type: "damage",
							target: "enemy",
							damageType: "crushing",
							dice: "1d8+3",
						},
					],
				},
			],
		},
	],
	tags: [],
});
