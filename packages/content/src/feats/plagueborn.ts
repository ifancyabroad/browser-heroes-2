import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "plagueborn",
	name: "Plagueborn",
	description: "Grants immunity to poison damage, but all healing received is halved.",
	icon: "feats/Aura_Infection_nb.png",
	kind: "bargain",
	category: "defensive",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "poison",
		},
		{
			type: "modifyHealing",
			multiplier: 0.5,
		},
	],
	attackRiders: [],
	tags: [],
});
