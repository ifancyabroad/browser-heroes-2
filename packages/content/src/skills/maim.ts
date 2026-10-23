import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "maim",
	name: "Maim",
	description:
		"Make a weapon attack with increased damage. On hit, a failed Constitution saving throw reduces the enemy's physical damage dealt and causes slashing damage over time.",
	icon: "skills/assassin/maim.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
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
							type: "modifyDamage",
							target: "enemy",
							damageClass: "physical",
							operation: "multiply",
							value: 0.75,
							duration: { unit: "turns", value: 2 },
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							damageClass: "physical",
							dice: "2d4",
							duration: { unit: "turns", value: 3 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
