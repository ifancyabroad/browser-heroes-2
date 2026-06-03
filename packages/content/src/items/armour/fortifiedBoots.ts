import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "fortified_boots",
	name: "Fortified Boots",
	description: "Reliable leather boots offering protection and comfort on any quest.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDIo0EKUsHIJUotmlJ?alt=media&token=5fec3690-b6e7-4086-9fe0-2aeec23c5fb2",
	level: 1,
	price: 70,
	armourType: "misc",
	properties: [
		{
			name: "crushing",
			type: "resistance",
			value: 20,
		},
	],
	type: "boots",
});
