import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_helm",
	name: "Sunforged Helm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGCUUOa6_Tprk3nGmx?alt=media&token=b4121810-4a92-42a0-af51-e42eeff9a78d",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "radiant",
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
