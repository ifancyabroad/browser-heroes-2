import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "wind_strike",
	name: "Wind Strike",
	description: "Make a weapon attack that deals additional lightning damage on hit.",
	icon: "skills/common/wind_strike.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
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
							damageType: "lightning",
							damageClass: "magical",
							dice: "1d10",
						},
					],
				},
			],
		},
	],
	tags: [],
});
