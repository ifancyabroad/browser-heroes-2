import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "gifted_healer",
	name: "Gifted Healer",
	description: "Healing is multiplied by 1.25.",
	icon: "feats/Skill_HealingAura_nb.png",
	kind: "training",
	category: "resource",
	modifiers: [
		{
			type: "modifyHealing",
			multiplier: 1.25,
		},
	],
	attackRiders: [],
	tags: [],
});
