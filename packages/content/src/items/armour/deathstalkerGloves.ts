import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_gloves",
	name: "Deathstalker Gloves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD696zVnfid6RFE48E-?alt=media&token=212967f9-cca1-4cf6-abd6-3b2a82d87e56",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "critChance",
			type: "auxiliaryStat",
			value: 2,
		},
		{
			name: "acid",
			type: "damage",
			value: 40,
		},
		{
			name: "acid",
			type: "resistance",
			value: 40,
		},
	],
	characterClass: "-N_OzueqvUwAUNXnlWpb",
	type: "gloves",
});
