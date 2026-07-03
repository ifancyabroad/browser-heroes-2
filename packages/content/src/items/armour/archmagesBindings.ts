import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_bindings",
	name: "Archmage's Bindings",
	description: "Crafted for the master of magic, these bracers enhance spell weaving.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDX395Nb8ifGXD2c7F?alt=media&token=e5f9b427-ce7b-474c-9f90-2386275d5b43",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
	],
	tags: [],
});
