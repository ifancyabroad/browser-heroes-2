import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "gifted_healer",
	name: "Gifted Healer",
	description: "Increase your healing and maximum HP at the cost of damage dealt.",
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
			value: 25,
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
