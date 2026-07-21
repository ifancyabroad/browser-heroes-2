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
