import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cleave",
	name: "Cleave",
	description: "A powerful weapon swing that deals additional slashing damage.",
	icon: "skills/barbarian/cleave.png",
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
							damageType: "slashing",
							dice: "1d8",
						},
					],
				},
			],
		},
	],
	tags: [],
});
