import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "iron_skin",
	name: "Iron Skin",
	description: "Dark transmutation toughens your body against physical punishment.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3yE_BOq5Xmhy4LvbI?alt=media&token=7098ab93-e0ec-486f-9f9b-2715b57815b6",
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
