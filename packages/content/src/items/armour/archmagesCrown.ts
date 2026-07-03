import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_crown",
	name: "Archmage's Crown",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEMdeX59k0__7Q0g8z?alt=media&token=5d04bbc8-1219-448c-ab7a-d04b0041cdc5",
	price: 1700,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 40,
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
