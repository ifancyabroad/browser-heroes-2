import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acrobatic_strike",
	name: "Acrobatic Strike",
	description:
		"Make a weapon attack with disadvantage. On hit, your next attack roll becomes an automatic critical hit before the effect expires.",
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
							duration: { unit: "turns", value: 1 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
