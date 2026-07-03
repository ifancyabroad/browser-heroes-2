import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "knights_helm",
	name: "Knight's Helm",
	description: "Worn by knights, it combines strength with regal design.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEOLAeWmY6AumCTBl_?alt=media&token=4131b3dc-680e-430e-a92d-4a36cdb3d84c",
	price: 710,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
