import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "enlightened",
	name: "Enlightened",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 4,
		},
	],
	tags: [],
});
