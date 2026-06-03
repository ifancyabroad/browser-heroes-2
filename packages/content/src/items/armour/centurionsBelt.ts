import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_belt",
	name: "Centurion's Belt",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGGxaNZsFNqbgQ1NTB?alt=media&token=828ebbcf-69fa-428c-9775-f425f351c2f2",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "crushing",
			type: "damage",
			value: 40,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 20,
		},
	],
	characterClass: "-OI74eayTZduv3tnmUwr",
	type: "belt",
});
