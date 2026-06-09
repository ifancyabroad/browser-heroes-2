import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "magisters_robe",
	name: "Magister's Robe",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IBW2DtLpMhCINfrZL?alt=media&token=50e79530-66d9-41b1-8f18-4c3122d54538",
	price: 350,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
