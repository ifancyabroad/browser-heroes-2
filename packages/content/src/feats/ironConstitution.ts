import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "iron_constitution",
	name: "Iron Constitution",
	description: "Exceptional endurance increases Constitution by 2.",
	icon: "feats/Skill_StoneBody_nb.png",
	kind: "attribute",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
