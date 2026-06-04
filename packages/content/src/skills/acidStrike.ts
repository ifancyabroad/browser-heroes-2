import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description: "Infuse your attack with corrosive acid, eating away at flesh.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "acid",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh0aZeozWw6_HWDH23?alt=media&token=7b30ca2b-4a56-43db-a5b2-ce88c87c7fa2",
	level: 1,
	maxUses: 7,
	name: "Acid Strike",
	price: 0,
	id: "acid_strike",
});
