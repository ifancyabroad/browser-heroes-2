import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "farmers_hat",
	name: "Farmer's Hat",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsHfOgKkqkCGlUZpJ0?alt=media&token=09a8d7db-05bd-4d1f-867f-cf0f01b06a76",
	price: 100,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
