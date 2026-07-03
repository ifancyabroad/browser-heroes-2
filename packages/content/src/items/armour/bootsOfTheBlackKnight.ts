import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "boots_of_the_black_knight",
	name: "Boots of the Black Knight",
	description: "These boots enhance strength and resilience, embodying the Black Knight's power.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDMcHFa0GCkFUel8IG?alt=media&token=78f93c9a-8395-47bd-90ab-8cd813cfa4cc",
	price: 760,
	rarity: "common",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
