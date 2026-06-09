import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "plated_boots",
	name: "Plated Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsX5jaTj2zR50FOQ0G?alt=media&token=bfd6d9db-59af-48d5-bafe-45174c3e5bd3",
	price: 320,
	rarity: "common",
	type: "armour",
	slot: "boots",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	tags: [],
});
