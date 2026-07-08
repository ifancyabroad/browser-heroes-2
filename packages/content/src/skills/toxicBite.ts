import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "toxic_bite",
	name: "Toxic Bite",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCiu-f5bl8zaJxDA2ji?alt=media&token=96da30c0-726e-4617-b0f7-cc2a6b62ac38",
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
