import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_crown",
	name: "Gold Crown",
	description: "This helm combines golden splendor with superior protection.",
	icon: "items/armour/helms/Helm_61_crown.png",
	price: 1520,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
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
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
	],
	tags: [],
});
