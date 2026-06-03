import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "hood_of_the_fox",
	name: "Hood of the Fox",
	description: "The Hood of the Fox, an enchanting accessory for those who revel in trickery.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NNvLx5iIM_zb3YGnsNC?alt=media&token=00cbdf99-29c4-4e7f-94da-da8f256e1722",
	level: 1,
	price: 120,
	armourType: "misc",
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 1,
		},
	],
	type: "helmet",
});
