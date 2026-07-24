import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "devoted_spirit",
	name: "Devoted Spirit",
	description: "Deep faith improves saving throws and radiant power.",
	icon: "skills/feats/devoted_spirit.png",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 1,
		},
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 10,
		},
	],
	attackRiders: [],
	tags: ["cleric"],
});
