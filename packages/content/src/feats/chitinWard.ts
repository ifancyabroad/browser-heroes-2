import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "chitin_ward",
	name: "Chitin Ward",
	description: "A hardened occult ward improves armor and piercing damage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHmFdmEfDy-KwSu7E7r?alt=media&token=daa6345a-26b7-446a-b518-0ae67fd60830",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
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
