import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fracture",
	name: "Fracture",
	description:
		"Make a weapon attack with increased damage, dealt as piercing damage. On hit, a failed Constitution saving throw makes the enemy vulnerable to piercing damage.",
	icon: "skills/assassin/fracture.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "debuff",
	rarity: "epic",
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
							duration: { unit: "turns", value: 3 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
