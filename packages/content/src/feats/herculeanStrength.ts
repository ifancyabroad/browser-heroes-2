import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "herculean_strength",
	name: "Herculean Strength",
	description: "Prodigious might increases Strength by 2.",
	icon: "skills/barbarian/battle_cry.png",
	kind: "attribute",
	category: "offensive",
	modifiers: [{ type: "modifyStat", stat: "strength", value: 2 }],
	attackRiders: [],
	tags: [],
});
