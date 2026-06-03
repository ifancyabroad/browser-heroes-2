import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "holy_symbol",
	name: "Holy Symbol",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHrXhe4BkI3jvlTYdl5?alt=media&token=50210988-1950-4109-bfa8-9061eee3f9c8",
	level: 3,
	price: 660,
	armourType: "misc",
	properties: [
		{
			name: "heal",
			type: "heal",
			value: 40,
		},
	],
	type: "amulet",
});
