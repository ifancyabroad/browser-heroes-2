import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ring_of_war",
	name: "Ring of War",
	description: "A ring pulsating with martial energy, enhancing combat prowess in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEhzNuCPqOh5YK7fk9?alt=media&token=384cce8e-9aba-41d6-91c0-05305fde9979",
	price: 360,
	rarity: "common",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
