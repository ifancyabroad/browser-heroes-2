import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shark_bite",
	name: "Shark Bite",
	description: "Tear into the enemy with a freezing bite that leaves a deep bleeding wound.",
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
							dice: "2d8",
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							dice: "1d6",
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
