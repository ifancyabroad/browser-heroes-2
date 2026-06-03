import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "novice_hood",
	name: "Novice Hood",
	description: "Basic headwear for novice adventurers, offering modest protection.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDYFP4JZdQ4KT3WfiB?alt=media&token=5060ad42-fc80-4398-9e04-16c277b7beff",
	level: 1,
	price: 120,
	armourType: "misc",
	properties: [
		{
			name: "intelligence",
			type: "stat",
			value: 1,
		},
	],
	type: "helmet",
});
