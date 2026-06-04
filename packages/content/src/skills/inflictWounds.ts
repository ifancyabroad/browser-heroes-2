import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Channel dark energy to deal necrotic damage with a chance to cause ongoing bleeding.",
	effects: [
		{
			damageType: "necrotic",
			max: 10,
			min: 1,
			modifier: "wisdom",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 10,
			duration: 4,
			effect: "bleed",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6NWgjfh9IAA7mMhg-?alt=media&token=51a6d406-36c1-4a37-8e4c-249db8aaed00",
	level: 1,
	maxUses: 8,
	name: "Inflict Wounds",
	price: 0,
	id: "inflict_wounds",
});
