import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "titanic",
	name: "Titanic",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 4,
		},
	],
	tags: [],
});
