import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "skull_charm",
	name: "Skull Charm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsDmNL0hFSSAeriHAg?alt=media&token=e9a76574-79b3-4f08-9c03-b2deaa6d4eab",
	level: 1,
	price: 100,
	armourType: "misc",
	properties: [
		{
			name: "critChance",
			type: "auxiliaryStat",
			value: 1,
		},
	],
	type: "amulet",
});
