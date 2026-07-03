import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "belt_of_shadows",
	name: "Belt of Shadows",
	description: "The Belt of Shadows, cloaking wearers in darkness for stealthy maneuvers.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9arODYaOWV5QYzw7E?alt=media&token=cae9f210-efe1-4bc2-8a10-7f413f21b511",
	price: 820,
	rarity: "common",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
