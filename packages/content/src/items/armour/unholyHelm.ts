import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_helm",
	name: "Unholy Helm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD61bPEClUCCVjF3_yK?alt=media&token=3bf2c6d6-f39d-4c9b-9181-87fe49ef7dd9",
	level: 4,
	price: 1700,
	armourType: "misc",
	properties: [
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "slashing",
			type: "resistance",
			value: 20,
		},
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 2,
		},
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-N_Ot99GWjYjrv9Gs-fP",
	type: "helmet",
});
