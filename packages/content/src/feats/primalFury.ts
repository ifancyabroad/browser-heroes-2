import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "primal_fury",
	name: "Primal Fury",
	description: "Fury is always close to the surface, improving accuracy and physical damage.",
	icon: "skills/feats/primal_fury.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 1,
		},
		{
			type: "modifyDamage",
			operation: "add",
			value: 10,
		},
	],
	attackRiders: [],
	tags: ["barbarian"],
});
