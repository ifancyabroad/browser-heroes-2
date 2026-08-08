import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_helm",
	name: "Unholy Helm",
	icon: "items/armour/sets/mail/Mail16_head.png",
	price: 2200,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "strength",
			value: 4,
		},
	],
	tags: [],
});
