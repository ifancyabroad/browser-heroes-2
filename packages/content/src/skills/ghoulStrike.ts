import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ghoul_strike",
	name: "Ghoul Strike",
	description: "Rake the enemy with a paralysing ghoul's claw.",
	icon: "skills/unique/ghoul_strike.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
	maxUses: 3,
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
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							durationTurns: 1,
							save: {
								attribute: "constitution",
								onSuccess: "noEffect",
								dc: { attribute: "constitution" },
							},
						},
					],
				},
			],
		},
	],
	tags: [],
});
