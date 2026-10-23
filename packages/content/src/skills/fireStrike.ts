import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fire_strike",
	name: "Fire Strike",
	description: "Make a weapon attack that deals additional fire damage on hit.",
	icon: "skills/barbarian/fire_strike.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 5,
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
							damageClass: "magical",
							dice: "2d6",
						},
					],
				},
			],
		},
	],
	tags: [],
});
