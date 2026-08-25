import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "execute",
	name: "Execute",
	description: "Commit to a single overwhelming executioner's blow that leaves a grievous wound.",
	icon: "skills/unique/execute.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2.5,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							damageClass: "physical",
							dice: "2d4",
							duration: { unit: "turns", value: 4 },
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
