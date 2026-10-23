import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crushing_blow",
	name: "Crushing Blow",
	description:
		"Make a weapon attack that deals additional crushing damage on hit. On hit, a failed Constitution saving throw also reduces the enemy's attack roll bonus.",
	icon: "skills/barbarian/crushing_blow.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
	maxUses: 6,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "crushing",
							damageClass: "physical",
							dice: "1d6",
						},
					],
				},
				{
					timing: "onHit",
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: { attribute: "strength" },
					},
					effects: [
						{
							type: "modifyStat",
							target: "enemy",
							stat: "attackRollBonus",
							value: -3,
							duration: { unit: "turns", value: 2 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
