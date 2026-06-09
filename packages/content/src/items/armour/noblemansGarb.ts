import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "noblemans_garb",
	name: "Nobleman's Garb",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8DA_DyFLruqd708ali?alt=media&token=93b91b0d-6e5e-41e1-80a9-7f021134777c",
	price: 250,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 3,
		},
	],
	tags: [],
});
