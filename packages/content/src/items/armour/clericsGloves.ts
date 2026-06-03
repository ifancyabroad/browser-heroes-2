import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "clerics_gloves",
	name: "Cleric's Gloves",
	description: "Gloves that channel divine power, offering protection and blessings.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDRlC-CERpPff66SUo?alt=media&token=0179bd87-fa5b-4dc0-86fd-68d878976a03",
	level: 1,
	price: 150,
	armourType: "misc",
	properties: [
		{
			name: "heal",
			type: "heal",
			value: 20,
		},
	],
	type: "gloves",
});
