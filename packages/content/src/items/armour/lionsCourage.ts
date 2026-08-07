import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "lions_courage",
	name: "Lion's Courage",
	description: "A ring embossed with a roaring lion, instilling courage and valor in its wearer.",
	icon: "items/armour/ring/Ring_16_lion.png",
	price: 1240,
	rarity: "legendary",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			value: 6,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 3,
		},
	],
	tags: [],
});
