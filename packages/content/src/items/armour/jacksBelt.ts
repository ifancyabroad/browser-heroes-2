import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_belt",
	name: "Jack's Belt",
	description: "Worn by versatile adventurers, this belt aids in mastering various skills.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9dCPBfsmrmF7finXd?alt=media&token=0ea47614-f283-40b1-a072-0d1c54a7e361",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "belt",
	category: "accessory",
	modifiers: [
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
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
