import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ruffian_boots",
	name: "Ruffian Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsFohigq1kIFfgS3Ro?alt=media&token=bfecd754-1415-4158-a4aa-b8052900f3ba",
	level: 1,
	price: 130,
	armourType: "misc",
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 1,
		},
	],
	type: "boots",
});
