import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "boots_of_insulation",
	name: "Boots of Insulation",
	description: "Insulated boots that provide warmth in freezing climates.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDP9ajYLLxtvR7c6Qf?alt=media&token=83d1f308-ed45-43ec-898c-110f3ec38625",
	price: 1550,
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
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
	],
	tags: [],
});
