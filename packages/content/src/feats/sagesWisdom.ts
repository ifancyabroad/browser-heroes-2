import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "sages_wisdom",
	name: "Sage's Wisdom",
	description: "Hard-won insight increases Wisdom by 2.",
	icon: "skills/cleric/prayer.png",
	kind: "attribute",
	category: "utility",
	modifiers: [{ type: "modifyStat", stat: "wisdom", value: 2 }],
	attackRiders: [],
	tags: [],
});
