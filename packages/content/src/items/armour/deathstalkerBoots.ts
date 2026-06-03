import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_boots",
	name: "Deathstalker Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1qgQRzqiWV8YTEeLZ?alt=media&token=509cf88b-b8a7-4c9b-b1e8-8630ae48c041",
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
			name: "slashing",
			type: "damage",
			value: 40,
		},
	],
	characterClass: "-N_OzueqvUwAUNXnlWpb",
	type: "boots",
});
