import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "windborne",
	name: "Windborne",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
	],
	tags: [],
});
