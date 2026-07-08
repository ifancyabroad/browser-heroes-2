import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shark_bite",
	name: "Shark Bite",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OAcJx5Xs5BJproNtWrj?alt=media&token=f042f62d-bcbb-4606-9a9a-fa979d37b271",
	pool: "unique",
	category: "attack",
	maxUses: 5,
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
							dice: "1d12+8",
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							dice: "1d4",
							durationTurns: 2,
						},
					],
				},
			],
		},
	],
	tags: [],
});
