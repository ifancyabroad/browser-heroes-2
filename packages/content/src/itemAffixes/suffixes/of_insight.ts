import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_insight",
	name: "of Insight",
	position: "suffix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 1,
		},
	],
	tags: [],
});
