import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_strike",
	name: "Poison Strike",
	description: "Coat your weapon with venom, delivering a toxic blow that poisons your target.",
	icon: "skills/assassin/poison_strike.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 6,
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
						dc: { attribute: "dexterity" },
					},
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							dice: "1d4",
							duration: { unit: "turns", value: 3 },
						},
						{
							type: "damage",
							target: "enemy",
							damageType: "poison",
							dice: "3d6",
						},
					],
				},
			],
		},
	],
	tags: [],
});
