import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "execute",
	name: "Execute",
	icon: "skills/unique/execute.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
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
