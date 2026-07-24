import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragon_scale_ring",
	name: "Dragon Scale Ring",
	icon: "items/armour/ring/Ring_50_dragon.png",
	price: 1650,
	rarity: "legendary",
	type: "armour",
	slot: "ring",
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
			damageType: "lightning",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
	],
	tags: [],
});
