import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "siphoned_vigor",
	name: "Siphoned Vigor",
	description: "Occult conditioning settles into lasting resilience.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTbtbVc3qk03XQO0GP?alt=media&token=d7bd191c-11cc-486a-bec4-aba3d27306fb",
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
