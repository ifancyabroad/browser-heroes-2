import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "evasion",
	name: "Evasion",
	description: "Constant footwork training makes you harder to hit.",
	icon: "skills/feats/evasion.png",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["rogue"],
});
