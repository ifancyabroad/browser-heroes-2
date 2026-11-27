import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "minotaur_charge",
	name: "Minotaur Charge",
	description:
		"Make a weapon attack with increased damage, dealt as piercing damage. On hit, a failed Strength saving throw stuns the enemy.",
	icon: "skills/unique/minotaur_charge.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	rarity: "common",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
			damageTypeOverride: "piercing",
			attackRiders: [
				{
					timing: "onHit",
					save: {
						attribute: "strength",
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
