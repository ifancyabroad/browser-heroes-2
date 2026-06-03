import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archers_mitts",
	name: "Archer's Mitts",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsGMnBGV7N7SeeXHe5?alt=media&token=b4dc4e5e-4b52-4217-9e3a-c46d3dfccb6d",
	level: 1,
	price: 140,
	armourType: "misc",
	properties: [
		{
			name: "piercing",
			type: "damage",
			value: 20,
		},
	],
	type: "gloves",
});
