import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "death_ward",
	name: "Death Ward",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEffxrjZ2Fu9zSmWW9?alt=media&token=b9663a5f-69a9-411a-b872-21adf66a0e07",
	level: 3,
	price: 730,
	armourType: "medium",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 2,
		},
		{
			name: "necrotic",
			type: "resistance",
			value: 40,
		},
		{
			name: "poison",
			type: "resistance",
			value: 40,
		},
	],
	type: "shield",
});
