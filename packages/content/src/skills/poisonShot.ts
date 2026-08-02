import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_shot",
	name: "Poison Shot",
	icon: "skills/common/poison_shot.png",
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
							type: "damage",
							target: "enemy",
							damageType: "poison",
							dice: "1d4",
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							dice: "1d4",
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
