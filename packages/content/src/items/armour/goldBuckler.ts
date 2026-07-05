import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_buckler",
	name: "Gold Buckler",
	description:
		"A small but sturdy buckler plated with gleaming gold, offering both defense and prestige.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEdBv-UWjlNRRjd8Gv?alt=media&token=748f3207-a3c5-4f77-9cc9-884376588f59",
	price: 650,
	rarity: "rare",
	type: "armour",
	slot: "shield",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
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
