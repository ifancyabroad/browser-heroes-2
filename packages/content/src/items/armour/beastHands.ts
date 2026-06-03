import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "beast_hands",
	name: "Beast Hands",
	description: "Gloves imbued with the untamed fury of beasts, enhancing combat prowess.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDVvTxuDLvTj0HU7Fq?alt=media&token=7a842ba9-5ecc-4a43-8965-c6a0890a8643",
	level: 4,
	price: 1550,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "damage",
			value: 40,
		},
		{
			name: "piercing",
			type: "damage",
			value: 40,
		},
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
	],
	type: "gloves",
});
