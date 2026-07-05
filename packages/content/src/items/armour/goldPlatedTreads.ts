import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_plated_treads",
	name: "Gold Plated Treads",
	description: "These boots combine golden elegance with robust protection.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDNGm-hePKbzQpkGR_?alt=media&token=d73fa61a-2287-4f19-9b24-57730fd26df3",
	price: 800,
	rarity: "rare",
	type: "armour",
	slot: "boots",
	modifiers: [
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
			damageType: "cold",
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
