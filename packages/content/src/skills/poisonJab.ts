import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_jab",
	name: "Poison Jab",
	description:
		"Make a weapon attack. On hit, a failed Constitution saving throw causes additional poison damage immediately and over time.",
	icon: "skills/assassin/poison_strike.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "common",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							attribute: "dexterity",
						},
					},
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "poison",
							damageClass: "other",
							dice: "1d4",
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							damageClass: "other",
							dice: "1d4",
							duration: {
								unit: "turns",
								value: 2,
							},
						},
					],
				},
			],
		},
	],
	tags: [],
});
