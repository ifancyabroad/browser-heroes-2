import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Utter a commanding word that has a chance to stun your enemy, leaving them momentarily helpless.",
	effects: [
		{
			difficulty: 17,
			duration: 2,
			effect: "stun",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTTlgwOpa5b9n39404?alt=media&token=39f0bc4a-7510-4187-8e4f-4aa17316cc93",
	level: 2,
	maxUses: 2,
	name: "Power Word: Stun",
	price: 0,
	id: "power_word_stun",
});
