import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "belt_of_acidic_protection",
	name: "Belt of Acidic Protection",
	description: "Worn by adventurers, this belt neutralizes the effects of harmful acids.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9beTp8W_WSoAQrD_H?alt=media&token=9d5534eb-2c62-4094-91af-f3a6420e22fb",
	price: 250,
	rarity: "common",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "acid",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "poison",
		},
	],
	tags: [],
});
