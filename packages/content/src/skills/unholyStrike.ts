import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Deliver a powerful blow infused with dark energy, dealing weapon and necrotic damage to your foe.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "necrotic",
			max: 15,
			min: 6,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6JOxRELo7S4PPW4K1?alt=media&token=212e281a-221d-4ecb-8b6f-bff3e48a81e3",
	level: 3,
	maxUses: 7,
	name: "Unholy Strike",
	price: 0,
	id: "unholy_strike",
});
