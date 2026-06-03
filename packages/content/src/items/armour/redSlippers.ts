import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "red_slippers",
	name: "Red Slippers",
	description: "Fire Boots that offer both defense and control over fiery environments.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDOAnwyIZqnaKvgDbO?alt=media&token=6af4b127-989a-4b95-9cda-79d6dd858438",
	level: 3,
	price: 700,
	armourType: "misc",
	properties: [
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "fire",
			type: "damage",
			value: 40,
		},
	],
	type: "boots",
});
