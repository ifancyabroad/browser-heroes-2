import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragon_scale_ring",
	name: "Dragon Scale Ring",
	description:
		"Forged around an ancient dragon scale, this ring hardens its wearer against every blow and renders flame harmless.",
	icon: "items/armour/ring/Ring_50_dragon.png",
	price: 1650,
	rarity: "legendary",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyDamageTaken",
			operation: "add",
			value: -4,
		},
	],
	tags: [],
});
