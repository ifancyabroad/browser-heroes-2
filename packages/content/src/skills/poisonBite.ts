import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_bite",
	name: "Poison Bite",
	icon: "skills/common/poison_bite.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
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
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							dice: "1d4",
							durationTurns: 4,
						},
					],
				},
			],
		},
	],
	tags: [],
});
