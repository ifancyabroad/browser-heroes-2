import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "novice_boots",
	name: "Novice Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsFEXygHRoGvMIceZi?alt=media&token=114849b5-76ba-4073-ad67-172831503e57",
	price: 120,
	rarity: "common",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
