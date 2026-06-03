import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "noblemans_garb",
	name: "Nobleman's Garb",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8DA_DyFLruqd708ali?alt=media&token=93b91b0d-6e5e-41e1-80a9-7f021134777c",
	level: 2,
	price: 250,
	armourClass: 10,
	armourType: "light",
	properties: [
		{
			name: "charisma",
			type: "stat",
			value: 3,
		},
	],
	type: "armour",
});
