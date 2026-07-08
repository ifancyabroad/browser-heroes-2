import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ghoul_strike",
	name: "Ghoul Strike",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgT_si0jS5qW1S5SbaJ?alt=media&token=e9f6910b-b610-407e-8484-3a2bebcc5308",
	pool: "unique",
	category: "attack",
	maxUses: 3,
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
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							durationTurns: 1,
						},
					],
				},
			],
		},
	],
	tags: [],
});
