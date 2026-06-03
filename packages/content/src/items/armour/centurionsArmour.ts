import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_armour",
	name: "Centurion's Armour",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGH3utgFlqilEXTLrc?alt=media&token=c9230c28-423e-4a78-a6e9-82ae0570b1a3",
	level: 4,
	price: 1800,
	armourClass: 15,
	armourType: "medium",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 4,
		},
		{
			name: "slashing",
			type: "damage",
			value: 40,
		},
		{
			name: "slashing",
			type: "resistance",
			value: 20,
		},
	],
	characterClass: "-OI74eayTZduv3tnmUwr",
	type: "armour",
});
