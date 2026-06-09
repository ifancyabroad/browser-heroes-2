import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_tunic",
	name: "Umbral Tunic",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGEyvrhJmIyWrInYHL?alt=media&token=f9a7b1ce-41dc-426c-9e9f-a3d957cc8ecd",
	price: 1800,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 12,
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 4,
		},
	],
	tags: [],
});
