import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "overpower",
	name: "Overpower",
	description:
		"Drive through the enemy's guard with a brutal blow that may leave their armour exposed.",
	icon: "skills/common/overpower.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
			damageTypeOverride: "crushing",
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "modifyStat",
							target: "enemy",
							stat: "armourClass",
							value: -4,
							durationTurns: 3,
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
