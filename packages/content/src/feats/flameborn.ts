import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "flameborn",
	name: "Flameborn",
	description: "Grants immunity to fire damage, but vulnerability to cold damage.",
	icon: "skills/feats/armour.png",
	kind: "bargain",
	category: "defensive",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "cold",
		},
	],
	attackRiders: [],
	tags: [],
});
