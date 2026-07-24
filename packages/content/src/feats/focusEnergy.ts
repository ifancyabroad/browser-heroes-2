import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "focus_energy",
	name: "Focused Strikes",
	description: "Disciplined breathing makes your attacks consistently more accurate.",
	icon: "skills/feats/focus_energy.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["warrior"],
});
