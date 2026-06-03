import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_boots",
	name: "Jack's Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIMQ4tZ-LSwGofSsawh?alt=media&token=1fd9924c-f582-4dc3-9635-3dafb46d51d1",
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
	type: "boots",
});
