import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_tunic",
	name: "Deathstalker Tunic",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8D90nWC6JFNgVjhehj?alt=media&token=8b65ce52-7f33-4fe9-a94f-9df6d74fdf8f",
	level: 4,
	price: 1800,
	armourClass: 12,
	armourType: "light",
	properties: [
		{
			name: "slashing",
			type: "damage",
			value: 40,
		},
		{
			name: "slashing",
			type: "resistance",
			value: 20,
		},
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-N_OzueqvUwAUNXnlWpb",
	type: "armour",
});
