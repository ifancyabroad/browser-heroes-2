import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "devoted_spirit",
	name: "Devoted Spirit",
	description: "Deep faith improves saving throws and radiant power.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTUH0cjt_Ek0BEIgUh?alt=media&token=ac5bf6ce-f097-45f5-b974-ee6bb37de865",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			operation: "add",
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
