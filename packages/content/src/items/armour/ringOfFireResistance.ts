import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ring_of_fire_resistance",
	name: "Ring of Fire Resistance",
	description: "Withstands searing temperatures, a ring providing steadfast fire resistance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NgJyz3yv_isH2ozl7vj?alt=media&token=bda92907-6815-4c01-89ec-301c4b803d0f",
	price: 90,
	rarity: "common",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
	],
	tags: [],
});
