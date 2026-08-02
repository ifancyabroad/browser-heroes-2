import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_bite",
	name: "Acid Bite",
	icon: "skills/common/acid_bite.png",
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
							damageType: "acid",
							dice: "1d4",
						},
					],
				},
			],
		},
	],
	tags: [],
});
