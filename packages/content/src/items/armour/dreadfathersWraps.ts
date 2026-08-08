import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_wraps",
	name: "Dreadfather's Wraps",
	icon: "items/armour/sets/cloth/Cloth7_gloves.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
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
