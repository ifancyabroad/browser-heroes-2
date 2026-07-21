import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "pestilent_affinity",
	name: "Pestilent Affinity",
	description: "Occult rites leave your poison magic more virulent.",
	icon: "skills/feats/pestilent_affinity.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 15,
		},
	],
	attackRiders: [],
	tags: ["occultist"],
});
