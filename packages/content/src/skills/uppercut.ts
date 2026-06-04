import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description: "A powerful upward strike with a chance to daze and stun your opponent.",
	effects: [
		{
			difficulty: 20,
			duration: 2,
			effect: "stun",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			damageType: "crushing",
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCyDgXDjHjrqD_5UViJ?alt=media&token=94e20229-12c4-465c-9504-925219a87cfe",
	level: 3,
	maxUses: 2,
	name: "Uppercut",
	price: 0,
	id: "uppercut",
});
