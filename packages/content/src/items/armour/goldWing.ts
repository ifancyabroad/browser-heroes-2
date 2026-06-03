import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_wing",
	name: "Gold Wing",
	description: "A shield crafted with golden wings, symbolizing protection and swift defense.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEgcZaaw2oFUsF7NBm?alt=media&token=798a61fe-2673-44dc-87e0-2a53737e8493",
	level: 4,
	price: 1420,
	armourType: "misc",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
		{
			name: "slashing",
			type: "resistance",
			value: 20,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 20,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 20,
		},
		{
			name: "slashing",
			type: "damage",
			value: 20,
		},
	],
	type: "shield",
});
