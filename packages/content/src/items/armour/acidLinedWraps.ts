import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "acid_lined_wraps",
	name: "Acid Lined Wraps",
	description: "Gloves lined with acid for potent offensive capabilities.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDREu63hlQeCbeC98U?alt=media&token=196ee5ad-8d9d-4256-a6c4-d72f4416036a",
	level: 1,
	price: 140,
	armourType: "misc",
	properties: [
		{
			name: "acid",
			type: "damage",
			value: 20,
		},
	],
	type: "gloves",
});
