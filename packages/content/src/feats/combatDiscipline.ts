import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "combat_discipline",
	name: "Combat Discipline",
	description: "Patient training grants a +2 bonus to attack rolls.",
	icon: "skills/feats/armour.png",
	kind: "training",
	category: "offensive",
	modifiers: [{ type: "modifyStat", stat: "attackRollBonus", value: 2 }],
	attackRiders: [],
	tags: [],
});
