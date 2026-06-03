import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "insulated_armour",
	name: "Insulated Armour",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8DBTz_fMTapnW0-nOH?alt=media&token=a9847a8b-f300-4e8f-9bfd-7bac90c67274",
	level: 3,
	price: 550,
	armourClass: 11,
	armourType: "light",
	properties: [
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
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
	],
	type: "armour",
});
