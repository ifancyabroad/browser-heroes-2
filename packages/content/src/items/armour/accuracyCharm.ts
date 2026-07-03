import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "accuracy_charm",
	name: "Accuracy Charm",
	description: "The Accuracy Charm, enhancing precision for deadly strikes.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9XWPqjT0yKB9xwlRp?alt=media&token=ab4394f9-b8cb-4413-9667-8ff647675bff",
	price: 690,
	rarity: "common",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 4,
		},
	],
	tags: [],
});
