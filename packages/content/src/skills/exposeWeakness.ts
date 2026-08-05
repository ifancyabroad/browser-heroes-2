import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "expose_weakness",
	name: "Expose Weakness",
	description:
		"Strike a vulnerable seam and expose it, causing the enemy to suffer greater damage from follow-up attacks.",
	icon: "skills/assassin/expose_weakness.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "debuff",
	rarity: "rare",
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
							type: "modifyDamageTaken",
							target: "enemy",
							operation: "multiply",
							value: 1.5,
							duration: { unit: "turns", value: 3 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
