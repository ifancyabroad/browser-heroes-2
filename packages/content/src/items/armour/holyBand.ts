import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "holy_band",
	name: "Holy Band",
	description: "A band blessed by divine powers, offering protection against dark forces.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEhe4hPN0nCGqfx5Mm?alt=media&token=75289b31-bd0e-4d91-bbc7-46d4edcd4cb4",
	price: 750,
	rarity: "common",
	type: "armour",
	slot: "ring",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
