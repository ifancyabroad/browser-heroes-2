import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "poison_charm",
	name: "Poison Charm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsTzrNjIZxmo7LLkrz?alt=media&token=55301e83-5f15-4d7c-8433-77b0a3a4e4ac",
	level: 2,
	price: 240,
	armourType: "misc",
	properties: [
		{
			name: "poison",
			type: "damage",
			value: 25,
		},
	],
	type: "amulet",
});
