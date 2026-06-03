import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "flame_adepts_belt",
	name: "Flame Adept's Belt",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsVF06QDELsXIu8I91?alt=media&token=1ae82fd6-d082-481a-b4cd-2d9d388a52d8",
	level: 3,
	price: 700,
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
			value: 20,
		},
	],
	type: "belt",
});
