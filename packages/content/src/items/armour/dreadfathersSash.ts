import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_sash",
	name: "Dreadfather's Sash",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIG02ZTMZxJPtP127s3?alt=media&token=d4f8efb3-96a0-4d1d-9fa4-30ca08729528",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "wisdom",
			type: "stat",
			value: 2,
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
	],
	characterClass: "-OHcffU4_J4vJV5nPD1l",
	type: "belt",
});
