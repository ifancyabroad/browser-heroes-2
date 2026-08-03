import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acrobatic_strike",
	name: "Acrobatic Strike",
	description:
		"Vault past the enemy and strike from an unexpected angle, creating one exceptional opportunity to land a critical blow.",
	icon: "skills/assassin/acrobatic_strike.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			rollMode: "advantage",
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "modifyStat",
							target: "self",
							stat: "criticalRangeBonus",
							value: 8,
							durationTurns: 1,
						},
					],
				},
			],
		},
	],
	tags: [],
});
