import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_ribcage",
	name: "Dreadfather's Ribcage",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIG0b1_0Qv-JCbVeksA?alt=media&token=9fabee45-ff66-433b-ae89-7721da41500b",
	level: 4,
	price: 1800,
	armourClass: 10,
	armourType: "cloth",
	properties: [
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 20,
		},
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-OHcffU4_J4vJV5nPD1l",
	type: "armour",
});
