import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "chitin_ward",
	name: "Chitin Ward",
	description: "A hardened occult ward improves armor and piercing damage.",
	icon: "skills/feats/chitin_ward.png",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 1,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 10,
		},
	],
	attackRiders: [],
	tags: ["occultist"],
});
