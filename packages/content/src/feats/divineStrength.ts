import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "divine_strength",
	name: "Divine Strength",
	description: "Faith lends permanent might to physical strikes.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkOF38JibaTuWhFGg_?alt=media&token=18908b64-c7c2-4581-b0b6-04b48c601aaf",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["cleric"],
});
