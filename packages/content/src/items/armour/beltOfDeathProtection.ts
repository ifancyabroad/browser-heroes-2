import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "belt_of_death_protection",
	name: "Belt of Death Protection",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9dXl3iLqpcbPi2vDZ?alt=media&token=f375b628-b83c-47a8-b251-900f406b2bca",
	level: 4,
	price: 1350,
	armourType: "misc",
	properties: [
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
		{
			name: "constitution",
			type: "stat",
			value: 4,
		},
	],
	type: "belt",
});
