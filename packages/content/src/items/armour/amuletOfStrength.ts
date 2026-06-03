import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "amulet_of_strength",
	name: "Amulet of Strength",
	description: "An enchanted amulet that amplifies the wearer's strength.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9SWjFRnu58szE_T-J?alt=media&token=e81fa74d-fb48-4a21-83fb-e12ed100f319",
	level: 1,
	price: 130,
	armourType: "misc",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 1,
		},
	],
	type: "amulet",
});
