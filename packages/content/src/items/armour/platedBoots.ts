import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "plated_boots",
	name: "Plated Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsX5jaTj2zR50FOQ0G?alt=media&token=bfd6d9db-59af-48d5-bafe-45174c3e5bd3",
	level: 2,
	price: 320,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 10,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 10,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 10,
		},
	],
	type: "boots",
});
