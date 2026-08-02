import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_bite",
	name: "Flame Bite",
	description: "Bite through the enemy while searing the wound with flame.",
	icon: "skills/common/flame_bite.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
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
							damageType: "fire",
							dice: "1d10",
						},
					],
				},
			],
		},
	],
	tags: [],
});
