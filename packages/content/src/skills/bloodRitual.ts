import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description:
		"Sacrifice your own vitality, causing you to bleed and take minor slashing damage, while dealing a powerful burst of necrotic damage to your foe.",
	effects: [
		{
			duration: 4,
			effect: "bleed",
			target: "self",
			type: "auxiliary",
		},
		{
			damageType: "slashing",
			max: 6,
			min: 1,
			target: "self",
			type: "damage",
		},
		{
			damageType: "necrotic",
			max: 60,
			min: 30,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6B_gQDrYyGkqVIUeX?alt=media&token=8414323d-ecd8-4fd7-909a-f2e1950bc0f8",
	level: 4,
	maxUses: 1,
	name: "Blood Ritual",
	price: 0,
	id: "blood_ritual",
});
