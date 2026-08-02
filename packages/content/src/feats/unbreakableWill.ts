import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "unbreakable_will",
	name: "Unbreakable Will",
	description: "Unshakable resolve grants a +2 bonus to saving throws.",
	icon: "skills/feats/armour.png",
	kind: "training",
	category: "defensive",
	modifiers: [{ type: "modifyStat", stat: "savingThrowBonus", value: 2 }],
	attackRiders: [],
	tags: [],
});
