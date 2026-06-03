import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "boots_of_the_black_knight",
	name: "Boots of the Black Knight",
	description: "These boots enhance strength and resilience, embodying the Black Knight's power.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDMcHFa0GCkFUel8IG?alt=media&token=78f93c9a-8395-47bd-90ab-8cd813cfa4cc",
	level: 3,
	price: 760,
	armourType: "misc",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "critChance",
			type: "auxiliaryStat",
			value: 2,
		},
	],
	type: "boots",
});
