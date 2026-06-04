import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description:
		"Unleash a flurry of attacks in a spinning motion, hitting your foe three times in quick succession.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqUWZDeys5x3n8eLNA?alt=media&token=74ce578b-3e45-44d2-8565-ccd0187437d0",
	level: 4,
	maxUses: 2,
	name: "Whirlwind Strike",
	price: 1260,
	id: "whirlwind_strike",
});
