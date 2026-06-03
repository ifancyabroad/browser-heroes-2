import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ring_of_natural_defense",
	name: "Ring of Natural Defense",
	description: "A ring attuned to nature's essence, offering protection against natural forces.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEjbVx4iDWd8myQ-1O?alt=media&token=fea5ac09-3bd2-40f9-aabf-606e94a1ee10",
	level: 2,
	price: 400,
	armourType: "misc",
	properties: [
		{
			name: "poison",
			type: "resistance",
			value: 40,
		},
		{
			name: "acid",
			type: "resistance",
			value: 40,
		},
	],
	type: "ring",
});
