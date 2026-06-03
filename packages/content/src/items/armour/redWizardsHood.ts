import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "red_wizards_hood",
	name: "Red Wizard's Hood",
	description: "Circlet of Power that enhances magical abilities and focus.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzELsGuv2GQ6PDoLFTQ?alt=media&token=93b5c0aa-0937-47b5-a95d-8828697758ef",
	level: 3,
	price: 670,
	armourType: "misc",
	properties: [
		{
			name: "fire",
			type: "damage",
			value: 25,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	type: "helmet",
});
