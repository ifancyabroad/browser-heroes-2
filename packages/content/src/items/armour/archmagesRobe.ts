import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_robe",
	name: "Archmage's Robe",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IE8osJo-rek1NyPIc?alt=media&token=bb9d2d96-5877-440f-a01c-c36766f60c21",
	level: 4,
	price: 1800,
	armourClass: 10,
	armourType: "cloth",
	properties: [
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
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-N_P0pcakZhKbNDftKoc",
	type: "armour",
});
