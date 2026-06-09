import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "royal_gambeson",
	name: "Royal Gambeson",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I8N2hC8j3lZ5p1Uyi?alt=media&token=98d80f45-4bc7-4770-8839-c86b6308f336",
	price: 280,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 13,
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
