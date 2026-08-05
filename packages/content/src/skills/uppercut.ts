import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "uppercut",
	name: "Uppercut",
	description: "A powerful upward strike with a chance to daze and stun your opponent.",
	icon: "skills/fighter/uppercut.png",
	pool: "fighter",
	kind: "weaponAttack",
	category: "debuff",
	rarity: "rare",
	maxUses: 2,
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
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							duration: { unit: "turns", value: 1 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
