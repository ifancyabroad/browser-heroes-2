import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "crown_charm",
	name: "Crown Charm",
	icon: "items/armour/neck/Neck_b_05.png",
	price: 1400,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "strength",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "radiant",
		},
	],
	tags: [],
});
