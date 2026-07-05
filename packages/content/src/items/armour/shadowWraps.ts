import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shadow_wraps",
	name: "Shadow Wraps",
	description: "Shadow Wraps that blend light and darkness, granting versatility.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDXgwpUa09kT1Ozuvb?alt=media&token=ffc3f50d-40fa-42ce-b3ae-bc3ac243fc96",
	price: 790,
	rarity: "rare",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
