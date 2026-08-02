import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "burning_shot",
	name: "Burning Shot",
	icon: "skills/common/burning_shot.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 2,
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
							dice: "2d6",
						},
					],
				},
			],
		},
	],
	tags: [],
});
