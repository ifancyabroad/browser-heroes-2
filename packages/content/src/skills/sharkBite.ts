import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shark_bite",
	name: "Shark Bite",
	icon: "skills/unique/shark_bite.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
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
