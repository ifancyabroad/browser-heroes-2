import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "mystics_bracers",
	name: "Mystic's Bracers",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsGpbKnJZq9OllA-Gt?alt=media&token=3a7adec6-9e1c-4680-9d6f-379361d263b9",
	price: 130,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
