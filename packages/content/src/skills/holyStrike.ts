import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "holy_strike",
	name: "Holy Strike",
	description: "Unleash divine retribution, smiting foes with holy power.",
	icon: "skills/cleric/holy_strike.png",
	pool: "cleric",
	kind: "weaponAttack",
	category: "damage",
	rarity: "common",
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
							type: "damage",
							target: "enemy",
							damageType: "radiant",
							dice: "1d8",
						},
					],
				},
			],
		},
	],
	tags: [],
});
