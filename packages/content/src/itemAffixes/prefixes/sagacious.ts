import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "sagacious",
	name: "Sagacious",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 4,
		},
	],
	tags: [],
});
