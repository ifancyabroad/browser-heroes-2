import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_plated_girdle",
	name: "Gold Plated Girdle",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1YkUL3gEF0ot7dzIK?alt=media&token=b6e7c943-f999-4b0d-a26f-9adc8b96231a",
	level: 3,
	price: 760,
	armourType: "misc",
	properties: [
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
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
	],
	type: "belt",
});
