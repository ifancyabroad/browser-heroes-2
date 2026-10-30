import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "impale",
	name: "Impale",
	description:
		"Make a weapon attack that deals piercing damage. On hit, a failed Constitution saving throw leaves a deep puncture, making the enemy vulnerable to piercing damage and reducing their healing.",
	icon: "skills/common/impale.png",
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
			damageTypeOverride: "piercing",
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
							damageType: "piercing",
							duration: { unit: "turns", value: 2 },
						},
						{
							type: "modifyHealing",
							target: "enemy",
							multiplier: 0.75,
							duration: { unit: "turns", value: 2 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
