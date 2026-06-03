import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shield",
	name: "Shield",
	description: "A sturdy, basic shield for versatile defense in close combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NZMqz87pcH6a1OgycJ9?alt=media&token=cd077d23-39d2-4c95-8a6e-65fe676b3b30",
	level: 1,
	price: 30,
	armourType: "medium",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 2,
		},
	],
	type: "shield",
});
