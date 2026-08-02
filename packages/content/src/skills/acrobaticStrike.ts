import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acrobatic_strike",
	name: "Acrobatic Strike",
	description: "Strike the enemy from above as you leap over them in an attempt to get behind.",
	icon: "skills/assassin/acrobatic_strike.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
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
							type: "modifyStat",
							target: "self",
							stat: "criticalRangeBonus",
							value: 1,
							durationTurns: 1,
						},
					],
				},
			],
		},
	],
	tags: [],
});
