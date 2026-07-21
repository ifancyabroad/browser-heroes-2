import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "corruption",
	name: "Corruption",
	description: "Dark rites make your necrotic power more difficult to resist.",
	icon: "skills/feats/corruption.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["warlock"],
});
