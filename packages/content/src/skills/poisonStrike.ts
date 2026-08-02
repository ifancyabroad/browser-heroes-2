import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_strike",
	name: "Poison Strike",
	description: "Coat your weapon with venom, delivering a toxic blow that poisons your target.",
	icon: "skills/assassin/poison_strike.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 7,
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
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							dice: "1d4",
							durationTurns: 6,
						},
						{
							type: "damage",
							target: "enemy",
							damageType: "poison",
							dice: "1d8",
						},
					],
				},
			],
		},
	],
	tags: [],
});
