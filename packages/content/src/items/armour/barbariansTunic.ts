import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "barbarians_tunic",
	name: "Barbarian's Tunic",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I5jiV3i13ZaPW46M9?alt=media&token=830c05d6-af02-464e-9fec-d309bf2f4557",
	level: 4,
	price: 1400,
	armourClass: 10,
	armourType: "medium",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 5,
		},
		{
			name: "constitution",
			type: "stat",
			value: 5,
		},
	],
	type: "armour",
});
