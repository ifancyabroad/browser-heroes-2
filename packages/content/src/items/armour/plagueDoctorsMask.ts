import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "plague_doctors_mask",
	name: "Plague Doctor's Mask",
	description: "Mask shielding against disease, embodying the iconic plague doctor.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEKX0v1PxgPkrsuGkt?alt=media&token=208de36b-748f-4453-ac0a-1ed388d33540",
	price: 240,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: -2,
		},
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
