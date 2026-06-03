import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_gauntlets",
	name: "Gold Gauntlets",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsY4zxPFBJQ1ZFVHE1?alt=media&token=fdd4b434-b6b5-4fc0-9c21-97f5f253b3ae",
	level: 3,
	price: 820,
	armourType: "misc",
	properties: [
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 20,
		},
	],
	type: "gloves",
});
