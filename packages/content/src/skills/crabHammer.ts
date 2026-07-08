import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crab_hammer",
	name: "Crab Hammer",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OAcIecu1k5j83kgrT_R?alt=media&token=a6d9fba5-4cf9-49d1-a000-b6bbb3c5b945",
	pool: "unique",
	category: "attack",
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
							damageType: "cold",
							dice: "1d10+5",
						},
						{
							type: "modifyStat",
							target: "enemy",
							stat: "armourClass",
							operation: "add",
							value: -4,
							durationTurns: 4,
						},
					],
				},
			],
		},
	],
	tags: [],
});
