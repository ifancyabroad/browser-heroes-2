import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ebonstride_footwear",
	name: "Ebonstride Footwear",
	description: "These black plated boots imbue the wearer with the essence of darkness.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDQAibdQUg6f9NfaKV?alt=media&token=eb229903-4717-40af-a219-52ec6570c1f3",
	price: 1480,
	rarity: "epic",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 3,
		},
	],
	tags: [],
});
