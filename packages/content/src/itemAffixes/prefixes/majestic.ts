import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "majestic",
	name: "Majestic",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			value: 4,
		},
	],
	tags: [],
});
