import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "armour_training",
	name: "Armour Training",
	description: "Expert use of protective equipment increases Armour Class by 2.",
	icon: "skills/feats/armour.png",
	kind: "training",
	category: "defensive",
	modifiers: [{ type: "modifyStat", stat: "armourClass", value: 2 }],
	attackRiders: [],
	tags: [],
});
