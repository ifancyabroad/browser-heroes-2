import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_claw",
	name: "Poison Claw",
	icon: "skills/common/poison_claw.png",
	pool: "common",
	category: "attack",
	maxUses: 6,
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
							damageType: "poison",
							dice: "1d6-1",
						},
					],
				},
			],
		},
	],
	tags: [],
});
