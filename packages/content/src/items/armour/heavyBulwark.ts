import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "heavy_bulwark",
	name: "Heavy Bulwark",
	description: "A massive bulwark of reinforced steel, providing unparalleled defense in battle.",
	icon: "items/armour/shields/shield_41.png",
	price: 1280,
	rarity: "legendary",
	type: "armour",
	slot: "shield",
	armourClass: 4,
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: -2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
	],
	tags: [],
});
