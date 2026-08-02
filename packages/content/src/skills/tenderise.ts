import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tenderise",
	name: "Tenderise",
	description: "Beat the enemy into submission with a chance to lower physical resistances.",
	icon: "skills/barbarian/tenderise.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "debuff",
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
							type: "modifyDamageAffinity",
							target: "enemy",
							affinity: "vulnerability",
							operation: "add",
							damageType: "crushing",
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
