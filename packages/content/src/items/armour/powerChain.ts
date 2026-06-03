import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "power_chain",
	name: "Power Chain",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1PVag9oTp2d8F8zd9?alt=media&token=98a60abe-0ea3-49cb-960b-3aa1896c1fb2",
	level: 4,
	price: 1520,
	armourType: "misc",
	properties: [
		{
			name: "crushing",
			type: "damage",
			value: 40,
		},
		{
			name: "constitution",
			type: "stat",
			value: 4,
		},
	],
	type: "amulet",
});
