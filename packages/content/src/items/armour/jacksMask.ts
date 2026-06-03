import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_mask",
	name: "Jack's Mask",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIMRCfAplYC4-tFtwlo?alt=media&token=f2df31fc-10ba-48fa-9549-e1b901281e63",
	level: 4,
	price: 1700,
	armourType: "misc",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
		{
			name: "charisma",
			type: "stat",
			value: 2,
		},
	],
	type: "helmet",
});
