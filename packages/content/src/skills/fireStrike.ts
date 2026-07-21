import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fire_strike",
	name: "Fire Strike",
	description: "Infuse your attack with searing flames to scorch your target.",
	icon: "skills/barbarian/fire_strike.png",
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
							damageType: "fire",
							dice: "1d10+5",
						},
					],
				},
			],
		},
	],
	tags: [],
});
