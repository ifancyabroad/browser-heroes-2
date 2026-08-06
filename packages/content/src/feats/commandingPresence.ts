import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "commanding_presence",
	name: "Commanding Presence",
	description: "Charisma increases by 6 and saving throws by 3.",
	icon: "feats/Skill_Commander_nb.png",
	kind: "utility",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			value: 6,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 3,
		},
	],
	attackRiders: [],
	tags: [],
});
