import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "keen_intellect",
	name: "Keen Intellect",
	description: "A brilliant mind increases Intelligence by 2.",
	icon: "skills/mage/magic_missiles.png",
	category: "utility",
	modifiers: [{ type: "modifyStat", stat: "intelligence", value: 2 }],
	attackRiders: [],
	tags: [],
});
