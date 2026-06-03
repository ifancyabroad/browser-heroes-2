import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_gloves",
	name: "Jack's Gloves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIMQrXX7Q4bITjIEdtR?alt=media&token=7d25fb0d-c791-46ce-919f-c3f9f235a595",
	level: 4,
	price: 1600,
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
	type: "gloves",
});
