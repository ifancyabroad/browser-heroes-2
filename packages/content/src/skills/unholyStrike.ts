import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "unholy_strike",
	name: "Unholy Strike",
	description: "Make a weapon attack that deals additional necrotic damage on hit.",
	icon: "skills/occultist/unholy_strike.png",
	pool: "occultist",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
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
							damageType: "necrotic",
							damageClass: "magical",
							dice: "1d10",
						},
					],
				},
			],
		},
	],
	tags: [],
});
