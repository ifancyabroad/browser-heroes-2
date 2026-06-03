import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragon_shield",
	name: "Dragon Shield",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEewgzTHrzKERJX1Mj?alt=media&token=981ffb08-96e7-4603-8d48-bb2f2c1eece0",
	level: 4,
	price: 1440,
	armourType: "medium",
	properties: [
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
	],
	type: "shield",
});
