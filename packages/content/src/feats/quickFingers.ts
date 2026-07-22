import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "quick_fingers",
	name: "Quick Fingers",
	description: "Fast hands improve your critical strike chance.",
	icon: "skills/feats/quick_fingers.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			operation: "add",
			value: 3,
		},
	],
	attackRiders: [],
	tags: ["rogue"],
});
