import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "voodoo_charm",
	name: "Voodoo Charm",
	description: "The Voodoo Necklace, harnessing the primal forces of voodoo magic.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9ZE3_8GkLUJ5oYCw7?alt=media&token=f9feca84-47e0-4e62-92d6-1cd34c6af964",
	level: 4,
	price: 1420,
	armourType: "misc",
	properties: [
		{
			name: "necrotic",
			type: "resistance",
			value: 40,
		},
		{
			name: "necrotic",
			type: "damage",
			value: 40,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	type: "amulet",
});
