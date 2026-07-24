import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "divine_inspiration",
	name: "Divine Inspiration",
	description: "Blessed purpose steadies body and spirit.",
	icon: "skills/feats/divine_inspiration.png",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["cleric"],
});
