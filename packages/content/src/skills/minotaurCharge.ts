import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "minotaur_charge",
	name: "Minotaur Charge",
	description: "Charge horns-first into the enemy with enough force to knock them senseless.",
	icon: "skills/unique/minotaur_charge.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
			damageTypeOverride: "piercing",
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							duration: { unit: "turns", value: 2 },
							save: {
								attribute: "strength",
								onSuccess: "noEffect",
								dc: { attribute: "strength" },
							},
						},
					],
				},
			],
		},
	],
	tags: [],
});
