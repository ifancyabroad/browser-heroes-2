import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warlocks_striders",
	name: "Warlock's Striders",
	description: "Warlock's Striders designed for comfort and mystical energy absorption.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDM2ApQWMggqJzd1Oj?alt=media&token=14c5b834-aaa3-4d82-8cf9-460aec1a16d5",
	level: 2,
	price: 280,
	armourType: "misc",
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 20,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 1,
		},
	],
	type: "boots",
});
