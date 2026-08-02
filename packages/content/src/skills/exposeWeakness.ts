import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "expose_weakness",
	name: "Expose Weakness",
	description: "Strike a vulnerable seam and leave the enemy exposed to follow-up attacks.",
	icon: "skills/assassin/expose_weakness.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "debuff",
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
							type: "modifyStat",
							target: "enemy",
							stat: "armourClass",
							value: -4,
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
