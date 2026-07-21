import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "iron_skin",
	name: "Iron Skin",
	description: "Dark transmutation toughens your body against physical punishment.",
	icon: "skills/feats/iron_skin.png",
	category: "defensive",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	attackRiders: [],
	tags: ["warlock"],
});
