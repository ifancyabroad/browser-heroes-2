import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ebonstride_footwear",
	name: "Ebonstride Footwear",
	description: "These black plated boots imbue the wearer with the essence of darkness.",
	icon: "items/armour/boots/Boots_12.png",
	price: 3200,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
	],
	tags: [],
});
