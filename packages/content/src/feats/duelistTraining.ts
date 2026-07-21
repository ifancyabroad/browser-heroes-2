import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "duelist_training",
	name: "Duelist Training",
	description: "Dedicated weapon training reinforces defense and blade control.",
	icon: "skills/feats/duelist_training.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 15,
		},
	],
	attackRiders: [],
	tags: ["warrior"],
});
