import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "unholy_strike",
	name: "Unholy Strike",
	description:
		"Deliver a powerful blow infused with dark energy, dealing weapon and necrotic damage to your foe.",
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
							dice: "1d10",
						},
					],
				},
			],
		},
	],
	tags: [],
});
