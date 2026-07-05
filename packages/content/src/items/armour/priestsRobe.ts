import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "priests_robe",
	name: "Priest's Robe",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHy38D6JyInKGAhwapF?alt=media&token=c804c9af-9ee6-4f33-8c3e-dbab27612487",
	price: 320,
	rarity: "uncommon",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
