import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dawn_strike",
	name: "Dawn Strike",
	description: "Make a weapon attack that deals additional radiant damage on hit.",
	icon: "skills/common/dawn_strike.png",
	pool: "common",
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
							damageType: "radiant",
							damageClass: "magical",
							dice: "2d8",
						},
					],
				},
			],
		},
	],
	tags: [],
});
