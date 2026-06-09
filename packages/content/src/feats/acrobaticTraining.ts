import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "acrobatic_training",
	name: "Acrobatic Training",
	description: "Years of agility training improve your chance to land critical hits.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqZdRYK5clYyJxqQKi?alt=media&token=7529994a-db1d-47e4-8a6f-b1b517e85d8c",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["assassin"],
});
