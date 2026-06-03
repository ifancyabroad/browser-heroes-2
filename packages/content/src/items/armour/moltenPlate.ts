import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "molten_plate",
	name: "Molten Plate",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I3pIr6Cshq65nK-Y8?alt=media&token=a011e348-e7c3-40e9-a5fb-eaaf31651e30",
	level: 3,
	price: 800,
	armourClass: 17,
	armourType: "heavy",
	properties: [
		{
			name: "fire",
			type: "resistance",
			value: 40,
		},
		{
			name: "fire",
			type: "damage",
			value: 40,
		},
	],
	type: "armour",
});
