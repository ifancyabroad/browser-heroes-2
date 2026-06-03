import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "travellers_robe",
	name: "Traveller's Robe",
	description: "Simple yet durable, this robe is tailored for those who journey far and wide.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NgO5fUaNmJH7LpPo2LP?alt=media&token=fcb298c5-6be0-485e-a713-3333026fb385",
	level: 1,
	price: 60,
	armourClass: 10,
	armourType: "cloth",
	properties: [
		{
			name: "piercing",
			type: "resistance",
			value: 25,
		},
	],
	type: "armour",
});
