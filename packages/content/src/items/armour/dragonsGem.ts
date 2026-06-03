import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragons_gem",
	name: "Dragon's Gem",
	description:
		"A ring housing a sparkling dragon's gem, amplifying the wearer's power and resilience.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEkYmCcJMY3uyCVbHm?alt=media&token=4cf48342-af39-48ee-aadb-97df113e7437",
	level: 4,
	price: 1650,
	armourType: "misc",
	properties: [
		{
			name: "fire",
			type: "damage",
			value: 40,
		},
		{
			name: "fire",
			type: "resistance",
			value: 40,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	type: "ring",
});
