import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "unholy_strike",
	name: "Unholy Strike",
	description:
		"Deliver a powerful blow infused with dark energy, dealing weapon and necrotic damage to your foe.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6JOxRELo7S4PPW4K1?alt=media&token=212e281a-221d-4ecb-8b6f-bff3e48a81e3",
	pool: "occultist",
	category: "attack",
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
							dice: "1d10+5",
						},
					],
				},
			],
		},
	],
	tags: [],
});
