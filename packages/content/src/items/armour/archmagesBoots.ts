import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_boots",
	name: "Archmage's Boots",
	description: "Boots infused with arcane energy, enhancing spellcasting prowess.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDNmAFnZcDHdtAbyd1?alt=media&token=d5274bd0-43ff-4b7d-979a-65d5137075cf",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "cold",
			type: "damage",
			value: 40,
		},
		{
			name: "dexterity",
			type: "stat",
			value: 4,
		},
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
	],
	characterClass: "-N_P0pcakZhKbNDftKoc",
	type: "boots",
});
