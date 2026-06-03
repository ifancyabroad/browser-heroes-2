import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "plate_gauntlets",
	name: "Plate Gauntlets",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1iYZuBlTsorGYWKKe?alt=media&token=34eb0b90-39c4-4476-be25-549d54527843",
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
	type: "gloves",
});
