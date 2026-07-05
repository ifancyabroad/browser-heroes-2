import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "insulated_armour",
	name: "Insulated Armour",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8DBTz_fMTapnW0-nOH?alt=media&token=a9847a8b-f300-4e8f-9bfd-7bac90c67274",
	price: 550,
	rarity: "rare",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 11,
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
	tags: [],
});
