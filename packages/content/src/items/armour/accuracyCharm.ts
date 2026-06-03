import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "accuracy_charm",
	name: "Accuracy Charm",
	description: "The Accuracy Charm, enhancing precision for deadly strikes.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9XWPqjT0yKB9xwlRp?alt=media&token=ab4394f9-b8cb-4413-9667-8ff647675bff",
	level: 3,
	price: 690,
	armourType: "misc",
	properties: [
		{
			name: "hitChance",
			type: "auxiliaryStat",
			value: 4,
		},
	],
	type: "amulet",
});
