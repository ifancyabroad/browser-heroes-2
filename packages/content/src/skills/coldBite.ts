import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cold_bite",
	name: "Cold Bite",
	icon: "skills/common/cold_bite.png",
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
							damageType: "cold",
							dice: "1d10+5",
						},
					],
				},
			],
		},
	],
	tags: [],
});
