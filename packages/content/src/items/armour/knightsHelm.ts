import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "knights_helm",
	name: "Knight's Helm",
	description: "Worn by knights, it combines strength with regal design.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEOLAeWmY6AumCTBl_?alt=media&token=4131b3dc-680e-430e-a92d-4a36cdb3d84c",
	level: 3,
	price: 710,
	armourType: "misc",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "charisma",
			type: "stat",
			value: 2,
		},
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
	],
	type: "helmet",
});
