import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "great_helm",
	name: "Great Helm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1_bCEqIAlG6OtkpQo?alt=media&token=3952bd8a-40eb-4a3e-9315-09688c596f1e",
	level: 3,
	price: 820,
	armourType: "misc",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
		{
			name: "slashing",
			type: "resistance",
			value: 15,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 15,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 15,
		},
	],
	type: "helmet",
});
