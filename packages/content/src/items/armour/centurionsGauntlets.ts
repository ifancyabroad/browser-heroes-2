import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_gauntlets",
	name: "Centurion's Gauntlets",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGGrPdsWdsGO48_7m6?alt=media&token=64aeb067-5f6e-462c-80fb-522f077cc3fa",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "intelligence",
			type: "stat",
			value: 4,
		},
		{
			name: "fire",
			type: "damage",
			value: 40,
		},
	],
	characterClass: "-OI74eayTZduv3tnmUwr",
	type: "gloves",
});
