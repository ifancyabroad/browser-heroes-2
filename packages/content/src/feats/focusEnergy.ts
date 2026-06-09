import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "focus_energy",
	name: "Focused Strikes",
	description: "Disciplined breathing makes your attacks consistently more accurate.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgpG6pLRAqTW1AU0Eg?alt=media&token=049464de-0935-4c27-9f76-c3be3474a194",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["warrior"],
});
