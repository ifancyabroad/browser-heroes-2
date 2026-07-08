import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_bite",
	name: "Flame Bite",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OFEZCfd9D55StQEZpFP?alt=media&token=215eafa2-0cf5-48b3-a9cd-350afcbf6ba2",
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
