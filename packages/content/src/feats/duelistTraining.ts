import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "duelist_training",
	name: "Duelist Training",
	description: "Dedicated weapon training reinforces defense and blade control.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHyC611JJw5TvqZwBXp?alt=media&token=0bdf70e9-f832-40ca-b40b-20cc7d2eb379",
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
