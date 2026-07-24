import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "brute_strength",
	name: "Brute Strength",
	description: "Hard-earned muscle grants lasting strength.",
	icon: "skills/feats/brute_strength.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["barbarian"],
});
