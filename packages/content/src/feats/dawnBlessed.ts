import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "dawn_blessed",
	name: "Dawn-Blessed",
	description: "Grants immunity to radiant damage, but vulnerability to necrotic damage.",
	icon: "skills/feats/Skill_NatureResistance_nb.png",
	kind: "bargain",
	category: "defensive",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "radiant",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
		},
	],
	attackRiders: [],
	tags: [],
});
