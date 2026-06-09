import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "runic_ward",
	name: "Runic Ward",
	description: "Protective runes remain etched into your defenses.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTRA6CoAdH4tX5ht_3?alt=media&token=47263956-7149-46fd-9133-8a7827a6b68c",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: ["occultist"],
});
