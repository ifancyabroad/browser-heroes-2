import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "brigandine_armour",
	name: "Brigandine Armour",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8Hu0onj7CWyDB2nP9R?alt=media&token=5bf34773-111f-4d1b-8f70-f64fa0104c6b",
	level: 3,
	price: 740,
	armourClass: 14,
	armourType: "medium",
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 15,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 15,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 15,
		},
	],
	type: "armour",
});
