import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "nullifying_ring",
	name: "Nullifying Ring",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1IDJ8vF3tUt49P6hY?alt=media&token=e448a0ab-8726-4f5f-9105-67cea798f8a3",
	price: 90,
	rarity: "common",
	type: "armour",
	slot: "ring",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
	tags: [],
});
