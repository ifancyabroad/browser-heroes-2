import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "winters_heart",
	name: "Winter's Heart",
	description: "Grants immunity to cold damage, but vulnerability to fire damage.",
	icon: "feats/Skill_FrostResistance_nb.png",
	kind: "bargain",
	category: "defensive",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "fire",
		},
	],
	attackRiders: [],
	tags: [],
});
