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
	rarity: "common",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			rollMode: "disadvantage",
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "modifyRoll",
							target: "self",
							roll: "attack",
							mode: "automaticCritical",
							charges: 1,
							durationTurns: 1,
						},
					],
				},
			],
		},
	],
	tags: [],
});
