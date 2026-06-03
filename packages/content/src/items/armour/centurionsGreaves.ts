import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_greaves",
	name: "Centurion's Greaves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGGef0ouMMSoDjGUdF?alt=media&token=d14ee9d5-b350-439b-9cad-1ce8c2e33fda",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 4,
		},
		{
			name: "necrotic",
			type: "damage",
			value: 40,
		},
		{
			name: "necrotic",
			type: "resistance",
			value: 20,
		},
	],
	characterClass: "-OI74eayTZduv3tnmUwr",
	type: "boots",
});
