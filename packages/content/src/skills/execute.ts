import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "execute",
	name: "Execute",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eoWCYJQSO0rbXfU9J?alt=media&token=8876c24f-0392-49c5-93eb-d0f618fe1476",
	pool: "unique",
	category: "attack",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							dice: "1d8",
							durationTurns: 5,
						},
					],
				},
			],
		},
	],
	tags: [],
});
