import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tenderise",
	name: "Tenderise",
	description:
		"Batter the enemy with a crushing blow that may leave them vulnerable to physical damage.",
	icon: "skills/barbarian/tenderise.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "debuff",
	rarity: "epic",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			damageTypeOverride: "crushing",
			attackRiders: [
				{
					timing: "onHit",
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: { attribute: "strength" },
					},
					effects: [
						{
							type: "modifyDamageTaken",
							target: "enemy",
							damageClass: "physical",
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
