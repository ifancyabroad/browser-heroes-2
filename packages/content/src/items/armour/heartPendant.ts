import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "heart_pendant",
	name: "Heart Pendant",
	description: "This pendant promotes healing and enhances the wearer's vitality.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9Tzv71IsVm5tRJuxU?alt=media&token=cb2a63a2-2398-42ee-9068-978e654a6345",
	level: 2,
	price: 280,
	armourType: "misc",
	properties: [
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	type: "amulet",
});
