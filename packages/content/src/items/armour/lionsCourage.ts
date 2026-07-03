import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "lions_courage",
	name: "Lion's Courage",
	description: "A ring embossed with a roaring lion, instilling courage and valor in its wearer.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEiKLauj-s86ubKuGI?alt=media&token=2fe3517b-1a31-43dd-ab5d-f019b490c932",
	price: 1240,
	rarity: "common",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 6,
		},
	],
	tags: [],
});
