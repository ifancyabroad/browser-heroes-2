import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragons_claw",
	name: "Dragon's Claw",
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
	],
	tags: [],
});
