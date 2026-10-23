import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "knock_down",
	name: "Knock Down",
	description:
		"Make a weapon attack that deals crushing damage. On hit, a failed Strength saving throw stuns the enemy.",
	icon: "skills/common/knock_down.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			damageTypeOverride: "crushing",
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
