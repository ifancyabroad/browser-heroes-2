import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_bite",
	name: "Acid Bite",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTmlFYyunJA4SqDKIX?alt=media&token=195bfdc0-a900-4a6e-ad26-a9bca0f2072d",
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
							dice: "1d6-1",
						},
					],
				},
			],
		},
	],
	tags: [],
});
