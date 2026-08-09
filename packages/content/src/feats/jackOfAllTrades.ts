import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "jack_of_all_trades",
	name: "Jack of All Trades",
	description: "All attributes increase by 2.",
	icon: "feats/skill_2_noBG.png",
	kind: "utility",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
