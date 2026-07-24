import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_crown",
	name: "Archmage's Crown",
	icon: "items/armour/sets/cloth/Cloth17_Head.png",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
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
