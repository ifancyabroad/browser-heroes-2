import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_slam",
	name: "Flame Slam",
	description:
		"Make a weapon attack with increased damage, dealt as crushing damage, plus fire damage on hit.",
	icon: "skills/common/flame_slam.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "epic",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
			damageTypeOverride: "crushing",
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "fire",
							damageClass: "magical",
							dice: "4d8",
						},
					],
				},
			],
		},
	],
	tags: [],
});
