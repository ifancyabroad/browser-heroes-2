import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "toxic_bite",
	name: "Toxic Bite",
	icon: "skills/common/toxic_bite.png",
	pool: "common",
	category: "attack",
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
							damageType: "poison",
							dice: "1d10+5",
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							dice: "1d6",
							durationTurns: 6,
						},
					],
				},
			],
		},
	],
	tags: [],
});
