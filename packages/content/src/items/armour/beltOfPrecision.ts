import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "belt_of_precision",
	name: "Belt of Precision",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NgO9yRhdOivFSL6xkCK?alt=media&token=25014e51-d215-4da2-9275-9c473d5d7b0b",
	price: 280,
	rarity: "common",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
