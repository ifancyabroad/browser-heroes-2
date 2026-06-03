import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "tower_shield",
	name: "Tower Shield",
	description: "A hefty tower shield, providing ample cover in the heat of battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEciDFUuzY6cG9UEia?alt=media&token=a08121c7-f9e5-4fa8-a348-79220e3bc85b",
	level: 1,
	price: 90,
	armourType: "heavy",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 3,
		},
	],
	type: "shield",
});
