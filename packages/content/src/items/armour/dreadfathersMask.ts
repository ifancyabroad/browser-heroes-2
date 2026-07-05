import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_mask",
	name: "Dreadfather's Mask",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIG-CccF8VTd7BELo99?alt=media&token=8c3323c4-e2a4-487d-a68f-e99fad2ebb2f",
	price: 1700,
	rarity: "epic",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: -4,
		},
	],
	tags: [],
});
