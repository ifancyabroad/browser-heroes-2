import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_bite",
	name: "Flame Bite",
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
							dice: "1d10+5",
						},
					],
				},
			],
		},
	],
	tags: [],
});
