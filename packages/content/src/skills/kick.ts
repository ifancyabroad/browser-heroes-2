import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description:
		"Deliver a swift kick with a chance to knock your opponent off balance and stun them.",
	effects: [
		{
			damageType: "crushing",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 17,
			duration: 2,
			effect: "stun",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh0AreyuN6wco1X_6B?alt=media&token=bd7521b3-bc47-411c-b523-7eeaf987f773",
	level: 1,
	maxUses: 2,
	name: "Kick",
	price: 0,
	id: "kick",
});
