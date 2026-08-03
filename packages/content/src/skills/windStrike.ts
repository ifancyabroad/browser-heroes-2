import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "wind_strike",
	name: "Wind Strike",
	description: "Strike with a weapon charged by storm winds and crackling lightning.",
	icon: "skills/common/wind_strike.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
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
							dice: "1d10",
						},
					],
				},
			],
		},
	],
	tags: [],
});
