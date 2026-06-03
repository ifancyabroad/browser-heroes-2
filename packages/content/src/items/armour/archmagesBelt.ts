import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_belt",
	name: "Archmage's Belt",
	description: "This belt augments spellcasting abilities, a mark of the master mage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9dpRJB6wpOfSUAF24?alt=media&token=c6a46ff1-0009-408f-a13f-abf9b9f98e6c",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "fire",
			type: "damage",
			value: 40,
		},
		{
			name: "lightning",
			type: "damage",
			value: 40,
		},
		{
			name: "cold",
			type: "damage",
			value: 40,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-N_P0pcakZhKbNDftKoc",
	type: "belt",
});
