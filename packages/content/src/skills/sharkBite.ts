import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shark_bite",
	name: "Shark Bite",
	description: "Tear into the enemy with a powerful bite that leaves a deep bleeding wound.",
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
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							dice: "1d6",
							durationTurns: 3,
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
