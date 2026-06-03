import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "wanderers_guise",
	name: "Wanderer's Guise",
	description: "Wanderer's Guise offering both protection and anonymity.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzENaEY9B6T05UFmdx3?alt=media&token=2d52238c-0bbd-46a7-8348-841c9b01bc12",
	level: 3,
	price: 750,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "damage",
			value: 20,
		},
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
	],
	type: "helmet",
});
