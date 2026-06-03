import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_crown",
	name: "Archmage's Crown",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEMdeX59k0__7Q0g8z?alt=media&token=5d04bbc8-1219-448c-ab7a-d04b0041cdc5",
	level: 4,
	price: 1700,
	armourType: "misc",
	properties: [
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "lightning",
			type: "damage",
			value: 40,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 20,
		},
	],
	characterClass: "-N_P0pcakZhKbNDftKoc",
	type: "helmet",
});
