import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragon_shield",
	name: "Dragon Shield",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEewgzTHrzKERJX1Mj?alt=media&token=981ffb08-96e7-4603-8d48-bb2f2c1eece0",
	price: 1440,
	rarity: "legendary",
	type: "armour",
	slot: "shield",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
