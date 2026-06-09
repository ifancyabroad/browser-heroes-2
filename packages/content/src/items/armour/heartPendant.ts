import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "heart_pendant",
	name: "Heart Pendant",
	description: "This pendant promotes healing and enhances the wearer's vitality.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9Tzv71IsVm5tRJuxU?alt=media&token=cb2a63a2-2398-42ee-9068-978e654a6345",
	price: 280,
	rarity: "common",
	type: "armour",
	slot: "amulet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
