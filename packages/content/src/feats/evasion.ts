import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "evasion",
	name: "Evasion",
	description: "Constant footwork training makes you harder to hit.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh-SuuVlmZIYSG87sp?alt=media&token=50aaef62-ac5c-4a23-8360-e7e26095a333",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["rogue"],
});
