import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shark_bite",
	name: "Shark Bite",
	description:
		"Make a weapon attack with increased damage, dealt as piercing damage, plus cold damage on hit. On hit, a failed Constitution saving throw also causes slashing damage over time.",
	icon: "skills/unique/shark_bite.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 5,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
			damageTypeOverride: "piercing",
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "cold",
							damageClass: "other",
							dice: "2d8",
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							damageClass: "physical",
							dice: "2d4",
							duration: { unit: "turns", value: 3 },
							save: {
								attribute: "constitution",
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
