import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "brawler",
	name: "Brawler",
	description: "All damage dealt is increased by 2.",
	icon: "skills/feats/armour.png",
	kind: "training",
	category: "offensive",
	modifiers: [{ type: "modifyDamage", operation: "add", value: 2 }],
	attackRiders: [],
	tags: [],
});
