import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crab_hammer",
	name: "Crab Hammer",
	description: "Hammer the enemy with a freezing claw that may crack their armour.",
	icon: "skills/unique/crab_hammer.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 2,
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
							damageType: "cold",
							dice: "3d6",
						},
						{
							type: "modifyStat",
							target: "enemy",
							stat: "armourClass",
							value: -4,
							durationTurns: 4,
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
