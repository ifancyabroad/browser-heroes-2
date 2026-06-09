import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "noblemans_belt",
	name: "Nobleman's Belt",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsEgnK2l9v3OvcBAzM?alt=media&token=ec12d5db-b3ba-455a-acbf-9866089499a8",
	price: 100,
	rarity: "common",
	type: "armour",
	slot: "belt",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
