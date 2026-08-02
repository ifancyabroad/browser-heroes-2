import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "savage_critical",
	name: "Savage Critical",
	description: "Critical hits roll one additional set of damage dice.",
	icon: "skills/feats/skill_200_noBG.png",
	kind: "training",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 1,
		},
	],
	attackRiders: [],
	tags: [],
});
