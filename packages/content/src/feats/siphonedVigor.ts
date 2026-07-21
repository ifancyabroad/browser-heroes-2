import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "siphoned_vigor",
	name: "Siphoned Vigor",
	description: "Occult conditioning settles into lasting resilience.",
	icon: "skills/feats/siphoned_vigor.png",
	category: "resource",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["occultist"],
});
