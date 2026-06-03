import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_bindings",
	name: "Archmage's Bindings",
	description: "Crafted for the master of magic, these bracers enhance spell weaving.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDX395Nb8ifGXD2c7F?alt=media&token=e5f9b427-ce7b-474c-9f90-2386275d5b43",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
		{
			name: "fire",
			type: "damage",
			value: 40,
		},
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
	],
	characterClass: "-N_P0pcakZhKbNDftKoc",
	type: "gloves",
});
