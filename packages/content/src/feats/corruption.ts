import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "corruption",
	name: "Corruption",
	description: "Dark rites make your necrotic power more difficult to resist.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI64f_s2x2W6j2Qsv1t?alt=media&token=cf6bc665-0adb-4186-8e75-fe2a87447c91",
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
