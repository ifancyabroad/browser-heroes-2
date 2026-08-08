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
			stat: "saveDcBonus",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 5,
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
