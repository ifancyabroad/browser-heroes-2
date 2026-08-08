import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragons_claw",
	name: "Dragon's Claw",
	description:
		"A talon-shaped ring that lends its wearer a dragon's speed and predatory precision, carving through foes with every strike.",
	icon: "items/armour/ring/Ring_b_09.png",
	price: 1680,
	rarity: "legendary",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
	],
	tags: [],
});
