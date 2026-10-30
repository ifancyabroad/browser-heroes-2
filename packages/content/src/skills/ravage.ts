import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ravage",
	name: "Ravage",
	description:
		"Make a weapon attack that deals slashing damage. On hit, a failed Constitution saving throw tears open a wound, making the enemy vulnerable to slashing damage and causing slashing damage over time.",
	icon: "skills/common/ravage.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			damageTypeOverride: "slashing",
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
							type: "modifyDamageAffinity",
							target: "enemy",
							affinity: "vulnerability",
							operation: "add",
							damageType: "slashing",
							duration: { unit: "turns", value: 2 },
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							damageClass: "physical",
							dice: "1d4",
							duration: { unit: "turns", value: 2 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
