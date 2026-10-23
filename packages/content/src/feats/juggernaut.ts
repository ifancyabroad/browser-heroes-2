import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "juggernaut",
	name: "Juggernaut",
	description: "Increase your Armour Class and maximum HP at the cost of your attack roll bonus.",
	icon: "feats/Skill_UnholyStrength_nb.png",
	kind: "survival",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 25,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: -4,
		},
	],
	attackRiders: [],
	tags: [],
});
