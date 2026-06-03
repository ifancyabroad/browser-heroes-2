import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "barbarians_bracers",
	name: "Barbarian's Bracers",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDS1M26zspCTVVGUnu?alt=media&token=79f6e859-1d6f-4d01-a573-27a035b4a5e2",
	level: 2,
	price: 320,
	armourType: "misc",
	properties: [
		{
			name: "crushing",
			type: "damage",
			value: 25,
		},
	],
	type: "gloves",
});
