import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "black_knight_cuirass",
	name: "Black Knight Cuirass",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8HvrUw3XyL6BhCvVRC?alt=media&token=a30223b2-947d-4c23-930c-70d4e01cbe86",
	price: 880,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 17,
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
