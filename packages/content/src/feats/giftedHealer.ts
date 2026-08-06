import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "gifted_healer",
	name: "Gifted Healer",
	description:
		"Healing is multiplied by 1.5 and maximum HP increases by 20, but all outgoing damage is multiplied by 0.75.",
	icon: "feats/Skill_HealingAura_nb.png",
	kind: "survival",
	category: "resource",
	modifiers: [
		{
			type: "modifyHealing",
			multiplier: 1.5,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 20,
		},
		{
			type: "modifyDamage",
			operation: "multiply",
			value: 0.75,
		},
	],
	attackRiders: [],
	tags: [],
});
