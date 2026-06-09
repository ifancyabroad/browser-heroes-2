import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "quick_fingers",
	name: "Quick Fingers",
	description: "Fast hands improve your critical strike chance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZq_C6vPLiGUFkYHy3u?alt=media&token=95e81572-3538-4686-bde3-70eaa9eeb15d",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 3,
		},
	],
	attackRiders: [],
	tags: ["rogue"],
});
