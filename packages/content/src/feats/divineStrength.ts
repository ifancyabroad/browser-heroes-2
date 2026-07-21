import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "divine_strength",
	name: "Divine Strength",
	description: "Faith lends permanent might to physical strikes.",
	icon: "skills/feats/divine_strength.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["cleric"],
});
