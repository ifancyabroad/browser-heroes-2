import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "wind_strike",
	name: "Wind Strike",
	icon: "skills/common/wind_strike.png",
	pool: "common",
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
							type: "damage",
							target: "enemy",
							damageType: "lightning",
							dice: "1d12+8",
						},
					],
				},
			],
		},
	],
	tags: [],
});
