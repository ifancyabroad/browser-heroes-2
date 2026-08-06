import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "juggernaut",
	name: "Juggernaut",
	description:
		"Armour Class increases by 4 and maximum HP by 25, but attack rolls are reduced by 4.",
	icon: "feats/Skill_StoneBody_nb.png",
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
