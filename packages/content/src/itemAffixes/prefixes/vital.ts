import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "vital",
	name: "Vital",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
	],
	tags: [],
});
