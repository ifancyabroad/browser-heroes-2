import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fracture",
	name: "Fracture",
	description:
		"Drive a precise blow into the enemy's guard, leaving them vulnerable to piercing attacks.",
	icon: "skills/assassin/fracture.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "debuff",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.25,
			damageTypeOverride: "piercing",
			attackRiders: [
				{
					timing: "onHit",
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: { attribute: "dexterity" },
					},
					effects: [
						{
							type: "modifyDamageAffinity",
							target: "enemy",
							affinity: "vulnerability",
							operation: "add",
							damageType: "piercing",
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
