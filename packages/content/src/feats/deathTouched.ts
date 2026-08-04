import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "death_touched",
	name: "Death-Touched",
	description: "Grants immunity to necrotic damage, but vulnerability to radiant damage.",
	icon: "feats/Skill_ShadowResistance_nb.png",
	kind: "bargain",
	category: "defensive",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "radiant",
		},
	],
	attackRiders: [],
	tags: [],
});
