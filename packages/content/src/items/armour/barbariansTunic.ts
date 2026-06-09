import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "barbarians_tunic",
	name: "Barbarian's Tunic",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I5jiV3i13ZaPW46M9?alt=media&token=830c05d6-af02-464e-9fec-d309bf2f4557",
	price: 1400,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 5,
		},
	],
	tags: [],
});
