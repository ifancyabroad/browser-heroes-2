import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "fancy_boots",
	name: "Fancy Boots",
	description: "Fancy boots adorned with intricate designs for a touch of sophistication.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDJ6_qoM0y7Sg2iTnL?alt=media&token=74369f33-f38b-4ad7-8256-b5af57ac4b68",
	price: 110,
	rarity: "common",
	type: "armour",
	slot: "boots",
	category: "accessory",
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
